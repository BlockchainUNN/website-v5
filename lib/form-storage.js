import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, list, put } from "@vercel/blob";
import { FormError } from "./form-validation.js";

const types = new Set(["registrations", "submissions"]);
const DUPLICATE_REGISTRATION_MESSAGE = "This email is already registered for Conference 5.0. If you need to change your details, please contact the BlockchainUNN team.";
const localRoot = path.resolve(process.env.FORM_DATA_DIR || ".local-data");

let poolPromise;

function databaseEnabled() {
  return Boolean(process.env.DATABASE_URL);
}

async function pool() {
  if (!poolPromise) {
    poolPromise = import("pg").then(({ default: pg }) => new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: Number(process.env.DATABASE_POOL_MAX || 3),
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
      allowExitOnIdle: true,
    }));
  }
  return poolPromise;
}

function directory(type) {
  if (!types.has(type)) throw new Error("Unknown form type");
  return path.join(localRoot, type);
}

function useBlob() {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) return true;
  if (process.env.VERCEL) throw new Error("Private Blob storage is not configured");
  return false;
}

function checkType(type) {
  if (!types.has(type)) throw new Error("Unknown form type");
}

export async function findRegistrationByEmail(email) {
  const normalized = (email || "").trim().toLowerCase();
  if (!normalized) return null;
  if (databaseEnabled()) {
    const db = await pool();
    const { rows } = await db.query("SELECT id FROM registrations WHERE lower(email) = $1 LIMIT 1", [normalized]);
    return rows[0] || null;
  }
  const records = await readRecords("registrations");
  return records.find((record) => (record.email || "").trim().toLowerCase() === normalized) || null;
}

async function saveToDatabase(type, fields, meta) {
  const db = await pool();
  if (type === "registrations") {
    try {
      const { rows } = await db.query(
        `INSERT INTO registrations
           (first_name, last_name, email, phone, attendance, hackathon, track, team, idea, user_agent, ip_hash)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11)
         RETURNING id, submitted_at`,
        [
          fields.firstName, fields.lastName, fields.email, fields.phone, fields.attendance,
          fields.hackathon === "yes", fields.track || "", JSON.stringify(fields.team || []),
          fields.idea || "", meta.userAgent || null, meta.ipHash || null,
        ],
      );
      const row = rows[0];
      return { id: row.id, submittedAt: new Date(row.submitted_at).toISOString(), ...fields };
    } catch (error) {
      if (error.code === "23505") throw new FormError(DUPLICATE_REGISTRATION_MESSAGE);
      throw error;
    }
  }
  const { rows } = await db.query(
    `INSERT INTO submissions
       (team_name, leader_name, leader_email, other_members, project_name, one_liner,
        description, pitch_deck_url, code_url, demo_url, live_url, user_agent, ip_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING id, submitted_at`,
    [
      fields.teamName, fields.leaderName, fields.leaderEmail, fields.otherMembers || "",
      fields.projectName, fields.oneLiner, fields.description, fields.pitchDeckUrl, fields.codeUrl,
      fields.demoUrl || "", fields.liveUrl || "", meta.userAgent || null, meta.ipHash || null,
    ],
  );
  const row = rows[0];
  return { id: row.id, submittedAt: new Date(row.submitted_at).toISOString(), ...fields };
}

export async function saveRecord(type, fields, meta = {}) {
  checkType(type);
  if (type === "registrations" && fields.email) {
    const existing = await findRegistrationByEmail(fields.email);
    if (existing) throw new FormError(DUPLICATE_REGISTRATION_MESSAGE);
  }
  if (databaseEnabled()) return saveToDatabase(type, fields, meta);

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

async function readFromDatabase(type) {
  const db = await pool();
  if (type === "registrations") {
    const { rows } = await db.query("SELECT * FROM registrations ORDER BY submitted_at ASC");
    return rows.map((row) => ({
      id: row.id,
      submittedAt: new Date(row.submitted_at).toISOString(),
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      attendance: row.attendance,
      hackathon: row.hackathon ? "yes" : "no",
      track: row.track,
      team: Array.isArray(row.team) ? row.team : [],
      idea: row.idea,
      emailSent: row.email_sent,
    }));
  }
  const { rows } = await db.query("SELECT * FROM submissions ORDER BY submitted_at ASC");
  return rows.map((row) => ({
    id: row.id,
    submittedAt: new Date(row.submitted_at).toISOString(),
    teamName: row.team_name,
    leaderName: row.leader_name,
    leaderEmail: row.leader_email,
    otherMembers: row.other_members,
    projectName: row.project_name,
    oneLiner: row.one_liner,
    description: row.description,
    pitchDeckUrl: row.pitch_deck_url,
    codeUrl: row.code_url,
    demoUrl: row.demo_url,
    liveUrl: row.live_url,
  }));
}

export async function readRecords(type) {
  checkType(type);
  if (databaseEnabled()) return readFromDatabase(type);
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

export async function markEmailSent(type, id) {
  if (type !== "registrations" || !databaseEnabled()) return false;
  const db = await pool();
  await db.query("UPDATE registrations SET email_sent = true WHERE id = $1", [id]);
  return true;
}
