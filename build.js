import { mkdir, cp, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { listAboutHeroImages } from "./asset-manifest.js";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/images", { recursive: true });
for (const file of ["index.html", "src", "public/_redirects"]) {
  const destination = file === "public/_redirects" ? "dist/_redirects" : `dist/${file}`;
  await cp(file, destination, { recursive: true });
}
async function copyImages(source, destination) {
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const from = join(source, entry.name);
    const to = join(destination, entry.name);
    if (entry.isDirectory()) {
      await mkdir(to, { recursive: true });
      await copyImages(from, to);
    } else if (/\.(webp|png|svg|avif)$/i.test(entry.name) ||
      (source === "public/images/about_hero" && /\.jpe?g$/i.test(entry.name))) {
      await cp(from, to);
    }
  }
}
await copyImages("public/images", "dist/images");
await writeFile(
  "dist/images/about_hero/manifest.json",
  JSON.stringify(await listAboutHeroImages()),
);
console.log("Static site built in dist/");
