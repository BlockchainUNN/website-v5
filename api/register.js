import { readPayload, json, handleError, requestMeta } from "../lib/form-api.js";
import { validateRegistration } from "../lib/form-validation.js";
import { saveRecord, markEmailSent } from "../lib/form-storage.js";
import { sendRegistrationConfirmation } from "../lib/confirmation-email.js";

export default {
  async fetch(request) {
    try {
      const registration = validateRegistration(await readPayload(request));
      const record = await saveRecord("registrations", registration, requestMeta(request));
      let emailSent = false;
      try {
        emailSent = await sendRegistrationConfirmation(record);
        if (emailSent) await markEmailSent("registrations", record.id);
      } catch (error) { console.error("Registration saved, but confirmation email failed", error); }
      return json({ id: record.id, emailSent }, 201);
    } catch (error) {
      return handleError(error);
    }
  },
};
