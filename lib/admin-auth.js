import { timingSafeEqual } from "node:crypto";

export function adminKeyConfigured() {
  return Boolean(process.env.FORM_EXPORT_KEY);
}

export function authorized(request) {
  const expected = process.env.FORM_EXPORT_KEY;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!expected || !supplied) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}
