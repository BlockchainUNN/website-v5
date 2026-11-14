import { authorized, adminKeyConfigured } from "../lib/admin-auth.js";
import { getFormStatus, setFormStatus } from "../lib/form-storage.js";
import { json } from "../lib/form-api.js";

export default {
  async fetch(request) {
    if (!adminKeyConfigured()) return json({ error: "Admin view is not configured." }, 503);
    if (!authorized(request)) return json({ error: "Invalid organiser key." }, 401);

    if (request.method === "GET") {
      try {
        return json(await getFormStatus());
      } catch (error) {
        console.error("Admin form status failed", error);
        return json({ error: "Could not load form availability." }, 503);
      }
    }

    if (request.method === "POST") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }
      if (typeof body?.registrationsOpen !== "boolean" || typeof body?.submissionsOpen !== "boolean") {
        return json({ error: "Both form states are required." }, 400);
      }
      try {
        return json(await setFormStatus({ registrationsOpen: body.registrationsOpen, submissionsOpen: body.submissionsOpen }));
      } catch (error) {
        console.error("Admin form status update failed", error);
        return json({ error: "Could not update form availability." }, 503);
      }
    }

    return json({ error: "Method not allowed." }, 405);
  },
};
