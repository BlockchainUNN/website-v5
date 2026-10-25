import { createHash } from "node:crypto";
import { FormError } from "./form-validation.js";

export function json(data, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function sameHost(origin, requestUrl) {
  try {
    return new URL(origin).host === new URL(requestUrl).host;
  } catch {
    return false;
  }
}

export async function readPayload(request) {
  if (request.method !== "POST") throw new FormError("Method not allowed.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new FormError("Expected JSON data.");
  const origin = request.headers.get("origin");
  if (origin && !sameHost(origin, request.url) && !allowedOrigins().includes(origin)) {
    throw new FormError("Invalid request origin.");
  }
  const raw = await request.text();
  if (raw.length > 16_000) throw new FormError("This form is too large.");
  let payload;
  try { payload = JSON.parse(raw); } catch { throw new FormError("Invalid form data."); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new FormError("Invalid form data.");
  return payload;
}

export function requestMeta(request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "";
  const salt = process.env.IP_HASH_SALT || "";
  return {
    userAgent: (request.headers.get("user-agent") || "").slice(0, 500) || null,
    ipHash: ip && salt ? createHash("sha256").update(`${salt}:${ip}`).digest("hex") : null,
  };
}

export function handleError(error) {
  if (error instanceof FormError) return json({ error: error.message }, 400);
  console.error("Form request failed", error);
  return json({ error: "We could not save this form. Please try again later." }, 503);
}
