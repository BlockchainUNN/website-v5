import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, list, put } from "@vercel/blob";

const types = new Set(["registrations", "submissions"]);
const localRoot = path.resolve(process.env.FORM_DATA_DIR || ".local-data");

function directory(type) {
  if (!types.has(type)) throw new Error("Unknown form type");
  return path.join(localRoot, type);
}

function useBlob() {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) return true;
  if (process.env.VERCEL) throw new Error("Private Blob storage is not configured");
  return false;
}

export async function saveRecord(type, fields) {
  const id = randomUUID();
  const record = { id, submittedAt: new Date().toISOString(), ...fields };
  const filename = `${id}.json`;
  if (useBlob()) {
    await put(`form-data/${type}/${filename}`, JSON.stringify(record), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
  } else {
    const folder = directory(type);
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, filename), JSON.stringify(record), { flag: "wx", mode: 0o600 });
  }
  return record;
}

export async function readRecords(type) {
  if (!types.has(type)) throw new Error("Unknown form type");
  if (useBlob()) {
    const records = [];
    let cursor;
    do {
      const page = await list({ prefix: `form-data/${type}/`, cursor, limit: 1000 });
      for (const item of page.blobs) {
        const result = await get(item.pathname, { access: "private", useCache: false });
        if (!result || result.statusCode !== 200) throw new Error(`Could not read ${item.pathname}`);
        records.push(await new Response(result.stream).json());
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return records.sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
  }
  const folder = directory(type);
  let files;
  try {
    files = await readdir(folder);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const records = await Promise.all(files.filter((name) => name.endsWith(".json")).map(async (name) => JSON.parse(await readFile(path.join(folder, name), "utf8"))));
  return records.sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
}
