import "./lib/load-env.js";
import http from "node:http";

const routes = {
  "/api/register": "./api/register.js",
  "/api/submit-project": "./api/submit-project.js",
  "/api/export": "./api/export.js",
};
const port = Number(process.env.API_PORT || 8001);
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

function corsHeaders(request) {
  const origin = request.headers.origin;
  if (!origin || !allowedOrigins.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function send(res, status, headers, body = "") {
  res.writeHead(status, headers);
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "OPTIONS") return send(res, 204, corsHeaders(req));
  if (url.pathname === "/health") {
    return send(res, 200, { "Content-Type": "application/json", "Cache-Control": "no-store" }, JSON.stringify({
      ok: true,
      storage: process.env.DATABASE_URL ? "postgres" : "file",
    }));
  }

  const modulePath = routes[url.pathname];
  if (!modulePath) {
    return send(res, 404, { "Content-Type": "application/json", ...corsHeaders(req) }, JSON.stringify({ error: "Not found." }));
  }

  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 20_000) {
        return send(res, 413, { "Content-Type": "application/json", ...corsHeaders(req) }, JSON.stringify({ error: "Request too large." }));
      }
      chunks.push(chunk);
    }

    const { default: handler } = await import(modulePath);
    const request = new Request(`http://${req.headers.host || `localhost:${port}`}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: chunks.length ? Buffer.concat(chunks) : undefined,
    });
    const response = await handler.fetch(request);
    const headers = { ...Object.fromEntries(response.headers), ...corsHeaders(req) };
    res.writeHead(response.status, headers);
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error("API request failed", error);
    send(res, 500, { "Content-Type": "application/json", ...corsHeaders(req) }, JSON.stringify({ error: "Internal server error." }));
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Blockchain UNN API → http://127.0.0.1:${port}`);
});
