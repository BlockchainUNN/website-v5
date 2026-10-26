import { authorized, adminKeyConfigured } from "../lib/admin-auth.js";
import { readRecords } from "../lib/form-storage.js";
import { createWorkbook } from "../lib/form-workbook.js";
import { json } from "../lib/form-api.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
    if (!adminKeyConfigured()) return json({ error: "Export is not configured." }, 503);
    if (!authorized(request)) return json({ error: "Invalid export key." }, 401);
    try {
      const [registrations, submissions] = await Promise.all([
        readRecords("registrations"), readRecords("submissions"),
      ]);
      const file = await createWorkbook(registrations, submissions);
      const date = new Date().toISOString().slice(0, 10);
      return new Response(file, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="blockchain-unn-forms-${date}.xlsx"`,
          "Cache-Control": "no-store, private",
          "X-Content-Type-Options": "nosniff",
        },
      });
    } catch (error) {
      console.error("Form export failed", error);
      return json({ error: "Could not generate the Excel file. Please try again." }, 503);
    }
  },
};
