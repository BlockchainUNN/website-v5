import "./lib/load-env.js";
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { listAboutHeroImages } from "./asset-manifest.js";
const root = process.cwd();
const port = Number(process.env.PORT || 3000);
const apiModules = {
  "/api/register": "./api/register.js",
  "/api/submit-project": "./api/submit-project.js",
  "/api/export": "./api/export.js",
};
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".avif": "image/avif",
  ".webp": "image/webp",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      if (apiModules[pathname]) {
        const chunks = [];
        let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 20_000) {
            res.writeHead(413);
            return res.end("Request too large");
          }
          chunks.push(chunk);
        }
        const { default: handler } = await import(apiModules[pathname]);
        const response = await handler.fetch(new Request(`http://${req.headers.host || `localhost:${port}`}${req.url}`, {
          method: req.method,
          headers: req.headers,
          body: chunks.length ? Buffer.concat(chunks) : undefined,
        }));
        res.writeHead(response.status, Object.fromEntries(response.headers));
        return res.end(Buffer.from(await response.arrayBuffer()));
      }
      if (pathname === "/images/about_hero/manifest.json") {
        const images = await listAboutHeroImages();
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        });
        return res.end(JSON.stringify(images));
      }
      const file = pathname.includes(".") ? pathname : "/index.html";
      const source = file.startsWith("/images/") ? "/public" + file : file;
      const resolved = path.resolve(root, "." + source);
      const publicFile = resolved === path.join(root, "index.html") ||
        (file.startsWith("/src/") && resolved.startsWith(path.join(root, "src") + path.sep)) ||
        (file.startsWith("/images/") && resolved.startsWith(path.join(root, "public/images") + path.sep));
      if (!publicFile) {
        res.writeHead(404);
        return res.end("Not found");
      }
      const content = await readFile(resolved);
      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
      });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(port, "0.0.0.0", () =>
    console.log(`Blockchain UNN → http://localhost:${port}`),
  );
