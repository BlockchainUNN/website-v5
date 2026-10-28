import { icon } from "./icons.js";

const field = (label, name, type = "text", options = {}) => `<label class="form-field${options.wide ? " form-field-wide" : ""}"><span>${label}${options.optional ? ' <small>Optional</small>' : ""}</span>${options.multiline ? `<textarea name="${name}" rows="${options.rows || 4}" maxlength="${options.max || 2000}" ${options.optional ? "" : "required"} placeholder="${options.placeholder || ""}"></textarea>` : `<input name="${name}" type="${type}" ${options.optional ? "" : "required"} maxlength="${options.max || 200}" ${options.autocomplete ? `autocomplete="${options.autocomplete}"` : ""} placeholder="${options.placeholder || ""}">`}</label>`;

const radio = (name, value, title, description = "") => `<label class="choice-card"><input type="radio" name="${name}" value="${value}" required><span><strong>${title}</strong>${description ? `<small>${description}</small>` : ""}</span></label>`;

const memberFields = (number, title, optional = false) => `<fieldset class="member-fields" data-member="${number}"><legend>${title} ${optional ? "<small>Optional</small>" : ""}</legend><div class="form-grid">${field("First and last name", `member${number}Name`, "text", { optional, max: 120, autocomplete: "name" })}${field("Email address", `member${number}Email`, "email", { optional, max: 254, autocomplete: "email" })}${field("X (Twitter) handle", `member${number}X`, "text", { optional, max: 50, placeholder: "@yourhandle" })}</div></fieldset>`;

const formIntro = (eyebrow, title, body) => `<div class="form-intro"><span class="form-eyebrow">${eyebrow}</span><h1>${title}</h1><p>${body}</p></div>`;

export function registrationPage() {
  return `<div class="forms-page"><div class="forms-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a>${formIntro("CONFERENCE 5.0 · 12—14 NOVEMBER", "Conference &amp; Hackathon Registration", "Join us at The BlockHive, Nsukka. Register for the conference, and tell us if you want to build in the hackathon.")}<div class="form-layout"><aside class="form-aside"><div class="form-aside-icon">${icon("calendar-days")}</div><span class="form-eyebrow">THE EVENT</span><h2>Intelligence Without Borders</h2><p>Two days of conversations, collaboration and building at the intersection of AI and Web3.</p><div class="form-event-meta"><span>${icon("calendar-days")} 12–14 November</span><span>${icon("map-pin")} The BlockHive, Nsukka </span><span>${icon("users-round")} Attend in person or join the virtual conference</span></div><a href="/submit-project">Already building? Submit your project ${icon("arrow-right")}</a></aside><form id="register-form" class="event-form"><div class="form-section-heading"><span>01 / 02</span><div><h2>Your details</h2><p>We’ll use these to confirm your place and contact you about the event.</p></div></div><div class="form-grid">${field("First name", "firstName", "text", { max: 80, autocomplete: "given-name" })}${field("Last name", "lastName", "text", { max: 80, autocomplete: "family-name" })}${field("Email address", "email", "email", { max: 254, autocomplete: "email" })}${field("Phone number / WhatsApp", "phone", "tel", { max: 30, autocomplete: "tel", placeholder: "+234…" })}</div><fieldset class="form-question"><legend>Will you be physically present for the hackathon and conference on 12–14 November at The BlockHive, Nsukka ?</legend><div class="choice-grid">${radio("attendance", "physical", "Yes, I’ll be there physically")}${radio("attendance", "virtual", "No, I’ll attend the virtual conference only")}</div></fieldset><fieldset class="form-question"><legend>Do you want to participate in the hackathon?</legend><div class="choice-grid">${radio("hackathon", "no", "No", "Conference registration only")}${radio("hackathon", "yes", "Yes", "Show hackathon registration details")}</div><p id="attendance-hint" class="form-hint" hidden>Hackathon participants need to attend in person. Choose physical attendance to continue.</p></fieldset><fieldset id="hackathon-fields" class="hackathon-fields" disabled hidden><div class="form-section-heading"><span>02 / 02</span><div><h2>Build with us</h2><p>Choose a track, add your team and tell us what you plan to make.</p></div></div><fieldset class="form-question"><legend>Which hackathon category do you want to participate in?</legend><div class="choice-grid">${radio("track", "AI", "AI Track")}${radio("track", "Web3", "Web3 Track", "Build with Pollar or Zcash")}</div></fieldset><div id="web3-info" class="track-info" hidden><strong>${icon("trophy")} Web3 track information</strong><p>Build on Pollar or Zcash—you can choose either.</p><div><span>Zcash bounty <b>Up to $500</b></span><span>Pollar bounty <b>Up to $300</b></span></div></div><div class="form-subheading"><h3>Team details</h3><p>Maximum of three people per team, including the leader.</p></div>${memberFields(1, "Team leader")}${memberFields(2, "Team member 2", true)}${memberFields(3, "Team member 3", true)}<div class="form-subheading"><h3>Project details</h3><p>A brief idea is enough—you can refine it as you build.</p></div><div class="form-grid">${field("What are you working on or what do you want to work on?", "idea", "text", { wide: true, multiline: true, max: 2000, placeholder: "Tell us the problem and the idea behind your project…" })}</div></fieldset><div class="form-honeypot" hidden aria-hidden="true"><label>Leave this field empty<input name="bunn_hp" tabindex="-1" autocomplete="off"></label></div><div class="form-submit-row"><p>We’ll use these details only to manage this event and contact you about your registration.</p><button type="submit" class="form-submit">Register ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form></div></div></div>`;
}

export function submissionPage() {
  return `<div class="forms-page"><div class="forms-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a>${formIntro("CONFERENCE 5.0 HACKATHON · FINAL SUBMISSION", "Submit your project", "Show us what your team built during the hackathon. Submit the work you have, even if it is still in progress.")}<div class="submission-note">${icon("lightbulb")}<p><strong>Builders, submit what you have.</strong> Your project does not need to be 100% finished or bug-free. What matters is what you built during the hackathon.</p></div><form id="project-form" class="event-form submission-form"><div class="form-section-heading"><span>01 / 03</span><div><h2>Your team</h2><p>Tell us who is behind the project.</p></div></div><div class="form-grid">${field("Team name", "teamName", "text", { max: 120 })}${field("Team leader name", "leaderName", "text", { max: 120, autocomplete: "name" })}${field("Team leader email", "leaderEmail", "email", { max: 254, autocomplete: "email" })}${field("Other team members (names and X handles)", "otherMembers", "text", { wide: true, optional: true, multiline: true, rows: 3, max: 1000 })}</div><div class="form-section-heading"><span>02 / 03</span><div><h2>Your project</h2><p>Explain what it does and why it matters.</p></div></div><div class="form-grid">${field("Project name", "projectName", "text", { max: 120 })}${field("Project one-liner", "oneLiner", "text", { wide: true, max: 240, placeholder: "Describe your project in one sentence" })}${field("Project description", "description", "text", { wide: true, multiline: true, rows: 5, max: 3000, placeholder: "What problem does it solve, and how does it work?" })}</div><div class="form-section-heading"><span>03 / 03</span><div><h2>Project links</h2><p>Share links that reviewers can open without requesting access. A demo video is optional but recommended.</p></div></div><div class="form-grid">${field("Pitch deck link (Google Slides, Canva or PDF)", "pitchDeckUrl", "url", { wide: true, max: 2000, placeholder: "https://…" })}${field("Codebase / GitHub repo", "codeUrl", "url", { wide: true, max: 2000, placeholder: "https://github.com/…" })}${field("Demo video link", "demoUrl", "url", { wide: true, optional: true, max: 2000, placeholder: "https://…" })}${field("Live / deployment link", "liveUrl", "url", { wide: true, optional: true, max: 2000, placeholder: "https://…" })}</div><div class="form-honeypot" hidden aria-hidden="true"><label>Leave this field empty<input name="bunn_hp" tabindex="-1" autocomplete="off"></label></div><div class="form-submit-row"><p>Check that your pitch deck and codebase links are accessible to reviewers.</p><button type="submit" class="form-submit">Submit project ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form></div></div>`;
}

export function adminPage() {
  return `<div class="forms-page"><div class="forms-shell admin-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a>${formIntro("ORGANISER ACCESS", "Form responses", "Enter the organiser key to view registrations and project submissions, or download the Excel workbook.")}<form id="admin-gate" class="event-form admin-gate"><label class="form-field"><span>Organiser key</span><input name="key" type="password" autocomplete="current-password" required></label><div class="form-submit-row"><p>The key is kept in this browser tab only.</p><button type="submit" class="form-submit">Unlock ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form><section id="admin-panel" hidden><div class="admin-toolbar"><div><span class="form-eyebrow">CONFERENCE 5.0</span><h2>Responses</h2><p class="admin-updated" data-admin-updated></p></div><div class="admin-actions"><button type="button" class="admin-button" data-admin-refresh>Refresh</button><button type="button" class="admin-button admin-button-primary" data-admin-export>Download Excel</button><button type="button" class="admin-button" data-admin-lock>Lock</button></div></div><p class="admin-status" role="status" aria-live="polite"></p><div class="admin-summary"><div><strong data-admin-count="registrations">0</strong><span>Registrations</span></div><div><strong data-admin-count="submissions">0</strong><span>Project submissions</span></div><div><strong data-admin-count="hackathon">0</strong><span>Hackathon teams</span></div></div><section class="admin-section"><div class="admin-section-head"><h3>Registrations</h3><input type="search" data-admin-search="registrations" placeholder="Search name, email, phone…" aria-label="Search registrations"></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Submitted</th><th>Name</th><th>Email</th><th>Phone / WhatsApp</th><th>Attendance</th><th>Hackathon</th><th>Team</th><th>Project idea</th></tr></thead><tbody data-admin-table="registrations"></tbody></table></div></section><section class="admin-section"><div class="admin-section-head"><h3>Final submissions</h3><input type="search" data-admin-search="submissions" placeholder="Search team, project, email…" aria-label="Search submissions"></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Submitted</th><th>Team</th><th>Leader</th><th>Other members</th><th>Project</th><th>One-liner</th><th>Description</th><th>Links</th></tr></thead><tbody data-admin-table="submissions"></tbody></table></div></section></section></div></div>`;
}

function value(form, name) { return form.elements.namedItem(name)?.value?.trim() || ""; }

function collectRegistration(form) {
  const team = [1, 2, 3].map((i) => ({ name: value(form, `member${i}Name`), email: value(form, `member${i}Email`), xHandle: value(form, `member${i}X`) }));
  return { firstName: value(form, "firstName"), lastName: value(form, "lastName"), email: value(form, "email"), phone: value(form, "phone"), attendance: value(form, "attendance"), hackathon: value(form, "hackathon"), track: value(form, "track"), team, idea: value(form, "idea"), bunn_hp: value(form, "bunn_hp") };
}

function collectSubmission(form) {
  return Object.fromEntries(["teamName", "leaderName", "leaderEmail", "otherMembers", "projectName", "oneLiner", "description", "pitchDeckUrl", "codeUrl", "demoUrl", "liveUrl", "bunn_hp"].map((name) => [name, value(form, name)]));
}

function bindForm(form, endpoint, collect) {
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const message = form.querySelector(".form-message");
    button.disabled = true;
    message.textContent = "Saving your details…";
    message.dataset.state = "pending";
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(collect(form)) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      const emailNote = endpoint === "/api/register" && result.emailSent ? " A confirmation email is on its way." : "";
      form.innerHTML = `<div class="form-success">${icon("circle-check")}<h2>${endpoint === "/api/register" ? "You’re registered." : "Project received."}</h2><p>Your details have been saved.${emailNote} Keep this reference: <strong>${result.id}</strong></p><a href="/events">Back to events ${icon("arrow-right")}</a></div>`;
    } catch (error) {
      message.textContent = error.message;
      message.dataset.state = "error";
      button.disabled = false;
    }
  });
}

export function initForms() {
  const registration = document.querySelector("#register-form");
  if (registration) {
    const hackathonFields = registration.querySelector("#hackathon-fields");
    const web3Info = registration.querySelector("#web3-info");
    const hint = registration.querySelector("#attendance-hint");
    function update() {
      const virtual = value(registration, "attendance") === "virtual";
      const hackathonYes = registration.querySelector('[name="hackathon"][value="yes"]');
      hackathonYes.disabled = virtual;
      if (virtual && hackathonYes.checked) {
        registration.querySelector('[name="hackathon"][value="no"]').checked = true;
      }
      hint.hidden = !virtual;
      const building = value(registration, "hackathon") === "yes";
      hackathonFields.hidden = !building;
      hackathonFields.disabled = !building;
      web3Info.hidden = value(registration, "track") !== "Web3";
      if (building && !value(registration, "member1Name")) {
        registration.elements.namedItem("member1Name").value = [value(registration, "firstName"), value(registration, "lastName")].filter(Boolean).join(" ");
      }
      if (building && !value(registration, "member1Email")) {
        registration.elements.namedItem("member1Email").value = value(registration, "email");
      }
    }
    registration.addEventListener("change", update);
    for (const group of registration.querySelectorAll('[data-member="2"], [data-member="3"]')) {
      group.addEventListener("input", () => {
        const inputs = [...group.querySelectorAll("input")];
        const started = inputs.some((input) => input.value.trim());
        inputs.forEach((input) => { input.required = started; });
      });
    }
    update();
    bindForm(registration, "/api/register", collectRegistration);
  }
  bindForm(document.querySelector("#project-form"), "/api/submit-project", collectSubmission);
  initAdmin();
}

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? escapeHtml(value || "") : escapeHtml(date.toLocaleString());
};

const safeLink = (url, label) => /^https?:\/\//i.test(String(url || ""))
  ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`
  : "";

const memberLine = (member) => `${escapeHtml(member.name || "")}${member.email ? ` (${escapeHtml(member.email)})` : ""}${member.xHandle ? ` ${escapeHtml(member.xHandle)}` : ""}`;

const registrationRow = (row) => `<tr><td class="admin-date">${formatDate(row.submittedAt)}</td><td>${escapeHtml(`${row.firstName || ""} ${row.lastName || ""}`.trim())}</td><td>${escapeHtml(row.email)}</td><td>${escapeHtml(row.phone)}</td><td>${escapeHtml(row.attendance === "virtual" ? "Virtual" : "Physical")}</td><td>${row.hackathon === "yes" ? `Yes${row.track ? ` — ${escapeHtml(row.track)}` : ""}` : "No"}</td><td>${Array.isArray(row.team) && row.team.length ? row.team.map(memberLine).join("<br>") : "—"}</td><td class="admin-wide">${escapeHtml(row.idea) || "—"}</td></tr>`;

const submissionRow = (row) => `<tr><td class="admin-date">${formatDate(row.submittedAt)}</td><td>${escapeHtml(row.teamName)}</td><td>${escapeHtml(row.leaderName)}<br><small>${escapeHtml(row.leaderEmail)}</small></td><td>${escapeHtml(row.otherMembers) || "—"}</td><td>${escapeHtml(row.projectName)}</td><td>${escapeHtml(row.oneLiner)}</td><td class="admin-wide">${escapeHtml(row.description)}</td><td>${[safeLink(row.pitchDeckUrl, "Deck"), safeLink(row.codeUrl, "Code"), safeLink(row.demoUrl, "Demo"), safeLink(row.liveUrl, "Live")].filter(Boolean).join(" · ") || "—"}</td></tr>`;

function initAdmin() {
  const gate = document.querySelector("#admin-gate");
  if (!gate) return;
  const panel = document.querySelector("#admin-panel");
  const keyInput = gate.elements.namedItem("key");
  const gateMessage = gate.querySelector(".form-message");
  const status = document.querySelector(".admin-status");
  const updated = document.querySelector("[data-admin-updated]");
  const tableBodies = {
    registrations: document.querySelector('[data-admin-table="registrations"]'),
    submissions: document.querySelector('[data-admin-table="submissions"]'),
  };
  const searchInputs = [...document.querySelectorAll("[data-admin-search]")];
  const exportButton = document.querySelector("[data-admin-export]");
  const refreshButton = document.querySelector("[data-admin-refresh]");
  const lockButton = document.querySelector("[data-admin-lock]");
  const meta = document.createElement("meta");
  meta.name = "robots";
  meta.content = "noindex, nofollow";
  document.head.append(meta);

  const storageKey = "bunn.admin.key";
  let key = "";
  let data = { registrations: [], submissions: [] };

  function render(kind) {
    const rows = data[kind] || [];
    const query = (document.querySelector(`[data-admin-search="${kind}"]`)?.value || "").trim().toLowerCase();
    const visible = query ? rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query)) : rows;
    const empty = kind === "registrations" ? "No registrations yet." : "No project submissions yet.";
    tableBodies[kind].innerHTML = visible.length
      ? visible.map(kind === "registrations" ? registrationRow : submissionRow).join("")
      : `<tr><td colspan="8" class="admin-empty">${query ? "No matching records." : empty}</td></tr>`;
  }

  function renderAll() {
    render("registrations");
    render("submissions");
    document.querySelector('[data-admin-count="registrations"]').textContent = data.registrations.length;
    document.querySelector('[data-admin-count="submissions"]').textContent = data.submissions.length;
    document.querySelector('[data-admin-count="hackathon"]').textContent = data.registrations.filter((row) => row.hackathon === "yes").length;
    updated.textContent = `Updated ${new Date().toLocaleString()}`;
  }

  async function load(nextKey, quiet = false) {
    if (!quiet) status.textContent = "Loading responses…";
    const headers = { Authorization: `Bearer ${nextKey}` };
    const [registrationsResponse, submissionsResponse] = await Promise.all([
      fetch("/api/admin/registrations", { headers, cache: "no-store" }),
      fetch("/api/admin/submissions", { headers, cache: "no-store" }),
    ]);
    if (registrationsResponse.status === 401 || submissionsResponse.status === 401) throw new Error("Invalid organiser key.");
    if (!registrationsResponse.ok || !submissionsResponse.ok) throw new Error("Could not load the responses. Try again.");
    const [registrationsBody, submissionsBody] = await Promise.all([registrationsResponse.json(), submissionsResponse.json()]);
    key = nextKey;
    data = { registrations: registrationsBody.registrations || [], submissions: submissionsBody.submissions || [] };
    sessionStorage.setItem(storageKey, key);
    gate.hidden = true;
    panel.hidden = false;
    gateMessage.textContent = "";
    status.textContent = "";
    renderAll();
  }

  async function attempt(nextKey, quiet = false) {
    if (!quiet) {
      gateMessage.textContent = "Checking key…";
      gateMessage.dataset.state = "pending";
    }
    try {
      await load(nextKey);
    } catch (error) {
      sessionStorage.removeItem(storageKey);
      key = "";
      gate.hidden = false;
      panel.hidden = true;
      if (!quiet) {
        gateMessage.textContent = error.message;
        gateMessage.dataset.state = "error";
      }
    }
  }

  gate.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextKey = keyInput.value.trim();
    if (nextKey) attempt(nextKey);
  });
  for (const input of searchInputs) input.addEventListener("input", () => render(input.dataset.adminSearch));

  refreshButton.addEventListener("click", async () => {
    if (!key) return;
    refreshButton.disabled = true;
    status.textContent = "Refreshing…";
    try { await load(key, true); }
    catch (error) { status.textContent = error.message; }
    finally { refreshButton.disabled = false; }
  });

  lockButton.addEventListener("click", () => {
    key = "";
    data = { registrations: [], submissions: [] };
    sessionStorage.removeItem(storageKey);
    gate.hidden = false;
    panel.hidden = true;
    gate.reset();
    gateMessage.textContent = "";
    keyInput.focus();
  });

  exportButton.addEventListener("click", async () => {
    if (!key) return;
    exportButton.disabled = true;
    status.textContent = "Preparing the Excel file…";
    try {
      const response = await fetch("/api/export", { method: "POST", headers: { Authorization: `Bearer ${key}` } });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Export failed.");
      }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = `blockchain-unn-forms-${new Date().toISOString().slice(0, 10)}.xlsx`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      status.textContent = "Excel file downloaded.";
    } catch (error) {
      status.textContent = error.message;
    } finally {
      exportButton.disabled = false;
    }
  });

  const saved = sessionStorage.getItem(storageKey);
  if (saved) attempt(saved, true);
}
