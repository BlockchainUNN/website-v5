import { mkdir, cp, readdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/images", { recursive: true });
for (const file of ["index.html", "src", "public/_redirects"]) {
  const destination = file === "public/_redirects" ? "dist/_redirects" : `dist/${file}`;
  await cp(file, destination, { recursive: true });
}
for (const file of await readdir("public/images")) {
  if (file.endsWith(".webp")) await cp(`public/images/${file}`, `dist/images/${file}`);
}
console.log("Static site built in dist/");
