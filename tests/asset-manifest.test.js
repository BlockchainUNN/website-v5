import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { listAboutHeroImages } from "../asset-manifest.js";

test("About hero manifest reflects folder additions and removals", async () => {
  const directory = await mkdtemp(join(tmpdir(), "bunn-about-hero-"));
  try {
    await writeFile(join(directory, "image 10.webp"), "");
    await writeFile(join(directory, "image 2.JPG"), "");
    await writeFile(join(directory, "notes.txt"), "");
    await mkdir(join(directory, "nested"));

    assert.deepEqual(await listAboutHeroImages(directory), [
      "/images/about_hero/image%202.JPG",
      "/images/about_hero/image%2010.webp",
    ]);

    await rm(join(directory, "image 2.JPG"));
    await writeFile(join(directory, "new.png"), "");
    assert.deepEqual(await listAboutHeroImages(directory), [
      "/images/about_hero/image%2010.webp",
      "/images/about_hero/new.png",
    ]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
