import { getFormStatus } from "../lib/form-storage.js";
import { json } from "../lib/form-api.js";

export default {
  async fetch(request) {
    if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);
    try {
      const status = await getFormStatus();
      return json({ registrationsOpen: status.registrationsOpen, submissionsOpen: status.submissionsOpen });
    } catch (error) {
      console.error("Form status failed", error);
      return json({ error: "Could not load form availability." }, 503);
    }
  },
};
