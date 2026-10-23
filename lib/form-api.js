import { FormError } from "./form-validation.js";

export function json(data, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function readPayload(request) {
  if (request.method !== "POST") throw new FormError("Method not allowed.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new FormError("Expected JSON data.");
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) throw new FormError("Invalid request origin.");
  const raw = await request.text();
  if (raw.length > 16_000) throw new FormError("This form is too large.");
  let payload;
  try { payload = JSON.parse(raw); } catch { throw new FormError("Invalid form data."); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new FormError("Invalid form data.");
  return payload;
}

export function handleError(error) {
  if (error instanceof FormError) return json({ error: error.message }, 400);
  console.error("Form request failed", error);
  return json({ error: "We could not save this form. Please try again later." }, 503);
}
