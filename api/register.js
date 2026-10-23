import { readPayload, json, handleError } from "../lib/form-api.js";
import { validateRegistration } from "../lib/form-validation.js";
import { saveRecord } from "../lib/form-storage.js";
import { sendRegistrationConfirmation } from "../lib/confirmation-email.js";

export default {
  async fetch(request) {
    try {
      const registration = validateRegistration(await readPayload(request));
      const record = await saveRecord("registrations", registration);
      let emailSent = false;
      try { emailSent = await sendRegistrationConfirmation(record); }
      catch (error) { console.error("Registration saved, but confirmation email failed", error); }
      return json({ id: record.id, emailSent }, 201);
    } catch (error) {
      return handleError(error);
    }
  },
};
