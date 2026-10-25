import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ExcelJS from "exceljs";
import { validateRegistration, validateSubmission, FormError } from "../lib/form-validation.js";

const validRegistration = {
  firstName: "Ada", lastName: "Okafor", email: "Ada@example.com", phone: "+234 800 123 4567",
  attendance: "physical", hackathon: "no", website: "",
};
const validSubmission = {
  teamName: "Builders", leaderName: "Ada Okafor", leaderEmail: "ada@example.com",
  projectName: "Open Campus", oneLiner: "A better campus platform", description: "Helps students find opportunities.",
  pitchDeckUrl: "https://example.com/deck", codeUrl: "https://github.com/example/repo",
};

test("conference-only registrations discard hidden hackathon details", () => {
  const result = validateRegistration({ ...validRegistration, track: "Web3", team: [{ name: "Stray" }], idea: "Old idea" });
  assert.equal(result.hackathon, "no");
  assert.deepEqual(result.team, []);
  assert.equal(result.track, "");
  assert.equal(result.email, "ada@example.com");
});

test("hackathon registration requires physical attendance, a track, and no more than three people", () => {
  const building = { ...validRegistration, hackathon: "yes", track: "Web3", idea: "A useful idea", team: [{ name: "Ada Okafor", email: "ada@example.com", xHandle: "@ada" }] };
  assert.equal(validateRegistration(building).team.length, 1);
  assert.throws(() => validateRegistration({ ...building, attendance: "virtual" }), FormError);
  assert.throws(() => validateRegistration({ ...building, track: "" }), FormError);
  assert.throws(() => validateRegistration({ ...building, team: Array(4).fill(building.team[0]) }), FormError);
});

test("honeypot is hidden from autofill and only rejects the dedicated field", () => {
  assert.throws(() => validateRegistration({ ...validRegistration, bunn_hp: "spam" }), FormError);
  assert.equal(validateRegistration({ ...validRegistration, website: "https://not-the-honeypot.example" }).firstName, "Ada");
});

test("final submission validates required links and optional links", () => {
  assert.equal(validateSubmission(validSubmission).demoUrl, "");
  assert.throws(() => validateSubmission({ ...validSubmission, pitchDeckUrl: "javascript:alert(1)" }), FormError);
  assert.throws(() => validateSubmission({ ...validSubmission, codeUrl: "" }), FormError);
});

test("records are saved and only an authorised export returns a real two-sheet workbook", async () => {
  const folder = await mkdtemp(join(tmpdir(), "bunn-forms-"));
  const oldDataDir = process.env.FORM_DATA_DIR;
  const oldExportKey = process.env.FORM_EXPORT_KEY;
  const oldBlobToken = process.env.BLOB_READ_WRITE_TOKEN;
  const oldStoreId = process.env.BLOB_STORE_ID;
  process.env.FORM_DATA_DIR = folder;
  process.env.FORM_EXPORT_KEY = "test-export-key";
  delete process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.BLOB_STORE_ID;
  try {
    const { default: register } = await import("../api/register.js");
    const { default: submit } = await import("../api/submit-project.js");
    const { default: exportForm } = await import("../api/export.js");
    const request = (url, data) => new Request(url, { method: "POST", headers: { "Content-Type": "application/json", Origin: "http://localhost" }, body: JSON.stringify(data) });
    const registration = await register.fetch(request("http://localhost/api/register", validRegistration));
    assert.equal(registration.status, 201);
    const submission = await submit.fetch(request("http://localhost/api/submit-project", { ...validSubmission, projectName: '=HYPERLINK("https://example.com", "click")' }));
    assert.equal(submission.status, 201);
    const denied = await exportForm.fetch(new Request("http://localhost/api/export", { method: "POST", headers: { Authorization: "Bearer wrong" } }));
    assert.equal(denied.status, 401);
    const response = await exportForm.fetch(new Request("http://localhost/api/export", { method: "POST", headers: { Authorization: "Bearer test-export-key" } }));
    assert.equal(response.status, 200);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(Buffer.from(await response.arrayBuffer()));
    assert.equal(workbook.worksheets.length, 2);
    assert.equal(workbook.getWorksheet("Registrations").getRow(2).getCell(3).value, "Ada");
    assert.equal(workbook.getWorksheet("Final submissions").getRow(2).getCell(3).value, "Builders");
    assert.equal(workbook.getWorksheet("Registrations").getRow(2).getCell(6).value, "+234 800 123 4567");
    assert.equal(workbook.getWorksheet("Final submissions").getRow(2).getCell(7).value, '\'=HYPERLINK("https://example.com", "click")');
  } finally {
    if (oldDataDir === undefined) delete process.env.FORM_DATA_DIR; else process.env.FORM_DATA_DIR = oldDataDir;
    if (oldExportKey === undefined) delete process.env.FORM_EXPORT_KEY; else process.env.FORM_EXPORT_KEY = oldExportKey;
    if (oldBlobToken === undefined) delete process.env.BLOB_READ_WRITE_TOKEN; else process.env.BLOB_READ_WRITE_TOKEN = oldBlobToken;
    if (oldStoreId === undefined) delete process.env.BLOB_STORE_ID; else process.env.BLOB_STORE_ID = oldStoreId;
    await rm(folder, { recursive: true, force: true });
  }
});
