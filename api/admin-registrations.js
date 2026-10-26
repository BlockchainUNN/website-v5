import { authorized, adminKeyConfigured } from "../lib/admin-auth.js";
import { readRecords } from "../lib/form-storage.js";
import { json } from "../lib/form-api.js";

export default {
  async fetch(request) {
    if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);
    if (!adminKeyConfigured()) return json({ error: "Admin view is not configured." }, 503);
    if (!authorized(request)) return json({ error: "Invalid organiser key." }, 401);
    try {
      return json({ registrations: await readRecords("registrations") });
    } catch (error) {
      console.error("Admin registrations failed", error);
      return json({ error: "Could not load registrations." }, 503);
    }
  },
};
