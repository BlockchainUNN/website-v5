import { readPayload, json, handleError, requestMeta } from "../lib/form-api.js";
import { validateSubmission } from "../lib/form-validation.js";
import { saveRecord } from "../lib/form-storage.js";

export default {
  async fetch(request) {
    try {
      const submission = validateSubmission(await readPayload(request));
      const record = await saveRecord("submissions", submission, requestMeta(request));
      return json({ id: record.id }, 201);
    } catch (error) {
      return handleError(error);
    }
  },
};
