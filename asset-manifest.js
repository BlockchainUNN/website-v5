import { readdir } from "node:fs/promises";

const imageFile = /\.(avif|jpe?g|png|webp)$/i;

export async function listAboutHeroImages(directory = "public/images/about_hero") {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && imageFile.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `/images/about_hero/${encodeURIComponent(name)}`);
}
