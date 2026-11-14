import { icon, brandIcon } from "./icons.js";

const field = (label, name, type = "text", options = {}) => `<label class="form-field${options.wide ? " form-field-wide" : ""}"><span>${label}${options.optional ? ' <small>Optional</small>' : ""}</span>${options.multiline ? `<textarea name="${name}" rows="${options.rows || 4}" maxlength="${options.max || 2000}" ${options.optional ? "" : "required"} placeholder="${options.placeholder || ""}"></textarea>` : `<input name="${name}" type="${type}" ${options.optional ? "" : "required"} maxlength="${options.max || 200}" ${options.autocomplete ? `autocomplete="${options.autocomplete}"` : ""} placeholder="${options.placeholder || ""}">`}</label>`;

const radio = (name, value, title, description = "") => `<label class="choice-card"><input type="radio" name="${name}" value="${value}" required><span><strong>${title}</strong>${description ? `<small>${description}</small>` : ""}</span></label>`;

const memberFields = (number, title, optional = false) => `<fieldset class="member-fields" data-member="${number}"><legend>${title} ${optional ? "<small>Optional</small>" : ""}</legend><div class="form-grid">${field("First and last name", `member${number}Name`, "text", { optional, max: 120, autocomplete: "name" })}${field("Email address", `member${number}Email`, "email", { optional, max: 254, autocomplete: "email" })}${field("X (Twitter) handle", `member${number}X`, "text", { optional, max: 50, placeholder: "@yourhandle" })}</div></fieldset>`;

const TIKTOK_URL = "https://www.tiktok.com/@blockchainunn";
const INSTAGRAM_URL = "https://www.instagram.com/blockchainunn/";

const raffleFields = `<fieldset class="form-question raffle-follow"><legend>Raffle draw: follow us on TikTok and Instagram</legend><p class="form-question-copy">Follow Blockchain UNN on TikTok and Instagram, then add both handles below to enter the raffle draw.</p><div class="raffle-follow-row"><a class="raffle-link tiktok" href="${TIKTOK_URL}" target="_blank" rel="noopener noreferrer">${brandIcon("tiktok")} Follow on TikTok ${icon("external-link")}</a><a class="raffle-link instagram" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer">${brandIcon("instagram")} Follow on Instagram ${icon("external-link")}</a></div><label class="choice-card raffle-confirm"><input type="checkbox" name="raffleEntry" value="yes"><span><strong>Enter me in the raffle draw</strong><small>I follow both accounts and want to enter.</small></span></label><div class="form-grid raffle-handles"><label class="form-field"><span>Instagram handle</span><input name="instagramHandle" type="text" maxlength="50" placeholder="@yourhandle" autocomplete="off"></label><label class="form-field"><span>TikTok handle</span><input name="tiktokHandle" type="text" maxlength="50" placeholder="@yourhandle" autocomplete="off"></label></div></fieldset>`;

const formIntro = (eyebrow, title, body) => `<div class="form-intro"><span class="form-eyebrow">${eyebrow}</span><h1>${title}</h1><p>${body}</p></div>`;

export function registrationPage() {
  return `<div class="forms-page reg-page"><div class="forms-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a><section class="reg-hero"><div class="reg-hero-copy"><span class="form-eyebrow">CONFERENCE 5.0 · 12—14 NOVEMBER</span><h1>Conference &amp; Hackathon Registration</h1><p>Join us at The BlockHive, Nsukka for two days of AI and Web3 talks, workshops and building. Register for the conference, and tell us if you want to build in the hackathon.</p><div class="reg-hero-meta"><span>${icon("calendar-days")} 12–14 November</span><span>${icon("map-pin")} The BlockHive, Nsukka</span><span>${icon("users-round")} In person or virtual</span></div></div><figure class="reg-hero-flyer"><img src="/images/email/conference-5-flyer.jpg" alt="BlockchainUNN Conference 5.0 flyer: Intelligence Without Borders, 12 to 14 November" width="1024" height="1280" fetchpriority="high"></figure></section><div class="form-layout"><aside class="form-aside"><div class="form-aside-icon">${icon("calendar-days")}</div><span class="form-eyebrow">THE EVENT</span><h2>Intelligence Without Borders</h2><p>Two days of conversations, collaboration and building at the intersection of AI and Web3.</p><div class="form-event-meta"><span>${icon("calendar-days")} 12–14 November</span><span>${icon("map-pin")} The BlockHive, Nsukka</span><span>${icon("users-round")} Attend in person or join the virtual conference</span></div><a href="/submit-project">Already building? Submit your project ${icon("arrow-right")}</a></aside><form id="register-form" class="event-form"><div class="form-section-heading"><span>01 / 02</span><div><h2>Your details</h2><p>We’ll use these to confirm your place and contact you about the event.</p></div></div><div class="form-grid">${field("First name", "firstName", "text", { max: 80, autocomplete: "given-name" })}${field("Last name", "lastName", "text", { max: 80, autocomplete: "family-name" })}${field("Email address", "email", "email", { max: 254, autocomplete: "email" })}${field("Phone number / WhatsApp", "phone", "tel", { max: 30, autocomplete: "tel", placeholder: "+234…" })}</div><fieldset class="form-question youtube-follow"><legend>Follow Blockchain UNN on YouTube to complete your registration</legend><p class="form-question-copy">Conference sessions stream live on YouTube, and recordings, speaker sessions and hackathon updates are posted there first.</p><div class="youtube-follow-row"><a class="youtube-follow-link" href="https://www.youtube.com/@blockchainunn" target="_blank" rel="noopener noreferrer">${brandIcon("youtube")} Open YouTube channel ${icon("external-link")}</a><label class="choice-card youtube-confirm"><input type="checkbox" name="youtubeFollowed" value="yes" required><span><strong>I follow Blockchain UNN on YouTube</strong><small>Required to finish registration.</small></span></label></div></fieldset>${raffleFields}<fieldset class="form-question"><legend>Will you be physically present for the hackathon and conference on 12–14 November at The BlockHive, Nsukka?</legend><div class="choice-grid">${radio("attendance", "physical", "Yes, I’ll be there physically")}${radio("attendance", "virtual", "No, I’ll attend the virtual conference only")}</div></fieldset><fieldset class="form-question"><legend>Do you want to participate in the hackathon?</legend><div class="choice-grid">${radio("hackathon", "no", "No", "Conference registration only")}${radio("hackathon", "yes", "Yes", "Show hackathon registration details")}</div><p id="attendance-hint" class="form-hint" hidden>Hackathon participants need to attend in person. Choose physical attendance to continue.</p></fieldset><fieldset id="hackathon-fields" class="hackathon-fields" disabled hidden><div class="form-section-heading"><span>02 / 02</span><div><h2>Build with us</h2><p>Choose a track, add your team and tell us what you plan to make.</p></div></div><fieldset class="form-question"><legend>Which hackathon category do you want to participate in?</legend><div class="choice-grid">${radio("track", "AI", "AI Track")}${radio("track", "Web3", "Web3 Track", "Build with Pollar or Zcash")}</div></fieldset><div id="web3-info" class="track-info" hidden><strong>${icon("trophy")} Web3 track information</strong><p>Build on Pollar or Zcash—you can choose either.</p><div><span>Zcash bounty <b>Up to $500</b></span><span>Pollar bounty <b>Up to $300</b></span></div></div><div class="form-subheading"><h3>Team details</h3><p>Maximum of three people per team, including the leader.</p></div>${memberFields(1, "Team leader")}${memberFields(2, "Team member 2", true)}${memberFields(3, "Team member 3", true)}<div class="form-subheading"><h3>Project details</h3><p>A brief idea is enough—you can refine it as you build.</p></div><div class="form-grid">${field("What are you working on or what do you want to work on?", "idea", "text", { wide: true, multiline: true, max: 2000, placeholder: "Tell us the problem and the idea behind your project…" })}</div></fieldset><div class="form-honeypot" hidden aria-hidden="true"><label>Leave this field empty<input name="bunn_hp" tabindex="-1" autocomplete="off"></label></div><div class="form-submit-row"><p>We’ll use these details only to manage this event and contact you about your registration.</p><button type="submit" class="form-submit">Register ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form></div></div></div>`;}

export function submissionPage() {
  return `<div class="forms-page"><div class="forms-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a>${formIntro("CONFERENCE 5.0 HACKATHON · FINAL SUBMISSION", "Submit your project", "Show us what your team built during the hackathon. Submit the work you have, even if it is still in progress.")}<div class="submission-note">${icon("lightbulb")}<p><strong>Builders, submit what you have.</strong> Your project does not need to be 100% finished or bug-free. What matters is what you built during the hackathon.</p></div><form id="project-form" class="event-form submission-form"><div class="form-section-heading"><span>01 / 03</span><div><h2>Your team</h2><p>Tell us who is behind the project.</p></div></div><div class="form-grid">${field("Team name", "teamName", "text", { max: 120 })}${field("Team leader name", "leaderName", "text", { max: 120, autocomplete: "name" })}${field("Team leader email", "leaderEmail", "email", { max: 254, autocomplete: "email" })}${field("Other team members (names and X handles)", "otherMembers", "text", { wide: true, optional: true, multiline: true, rows: 3, max: 1000 })}</div><div class="form-section-heading"><span>02 / 03</span><div><h2>Your project</h2><p>Explain what it does and why it matters.</p></div></div><div class="form-grid">${field("Project name", "projectName", "text", { max: 120 })}${field("Project one-liner", "oneLiner", "text", { wide: true, max: 240, placeholder: "Describe your project in one sentence" })}${field("Project description", "description", "text", { wide: true, multiline: true, rows: 5, max: 3000, placeholder: "What problem does it solve, and how does it work?" })}</div><div class="form-section-heading"><span>03 / 03</span><div><h2>Project links</h2><p>Share links that reviewers can open without requesting access. A demo video is optional but recommended.</p></div></div><div class="form-grid">${field("Pitch deck link (Google Slides, Canva or PDF)", "pitchDeckUrl", "url", { wide: true, max: 2000, placeholder: "https://…" })}${field("Codebase / GitHub repo", "codeUrl", "url", { wide: true, max: 2000, placeholder: "https://github.com/…" })}${field("Demo video link", "demoUrl", "url", { wide: true, optional: true, max: 2000, placeholder: "https://…" })}${field("Live / deployment link", "liveUrl", "url", { wide: true, optional: true, max: 2000, placeholder: "https://…" })}</div><div class="form-honeypot" hidden aria-hidden="true"><label>Leave this field empty<input name="bunn_hp" tabindex="-1" autocomplete="off"></label></div><div class="form-submit-row"><p>Check that your pitch deck and codebase links are accessible to reviewers.</p><button type="submit" class="form-submit">Submit project ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form></div></div>`;
}

export function adminPage() {
  return `<div class="forms-page"><div class="forms-shell admin-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a>${formIntro("ORGANISER ACCESS", "Form responses", "Enter the organiser key to view registrations and project submissions, or download the Excel workbook.")}<form id="admin-gate" class="event-form admin-gate"><label class="form-field"><span>Organiser key</span><input name="key" type="password" autocomplete="current-password" required></label><div class="form-submit-row"><p>The key is kept in this browser tab only.</p><button type="submit" class="form-submit">Unlock ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form><section id="admin-panel" hidden><div class="admin-toolbar"><div><span class="form-eyebrow">CONFERENCE 5.0</span><h2>Responses</h2><p class="admin-updated" data-admin-updated></p></div><div class="admin-actions"><button type="button" class="admin-button" data-admin-refresh>Refresh</button><button type="button" class="admin-button admin-button-primary" data-admin-export="all">Download all</button><button type="button" class="admin-button" data-admin-export="submissions">Hackathon projects</button><button type="button" class="admin-button" data-admin-export="registrations">Registrations</button><button type="button" class="admin-button" data-admin-lock>Lock</button></div></div><p class="admin-status" role="status" aria-live="polite"></p><div class="admin-summary"><div><strong data-admin-count="registrations">0</strong><span>Registrations</span></div><div><strong data-admin-count="submissions">0</strong><span>Project submissions</span></div><div><strong data-admin-count="hackathon">0</strong><span>Hackathon teams</span></div><div><strong data-admin-count="raffle">0</strong><span>Raffle entries</span></div></div><section class="admin-section admin-availability"><div class="admin-section-head"><div><h3>Form availability</h3><p>Close a form to stop new entries immediately.</p></div></div><div class="admin-availability-grid"><button type="button" class="admin-toggle" data-admin-toggle="registrations">Registrations <strong data-admin-status="registrations">Open</strong></button><button type="button" class="admin-toggle" data-admin-toggle="submissions">Project submissions <strong data-admin-status="submissions">Open</strong></button></div></section><section class="admin-section"><div class="admin-section-head"><h3>Registrations</h3><input type="search" data-admin-search="registrations" placeholder="Search name, email, phone…" aria-label="Search registrations"></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Submitted</th><th>Name</th><th>Email</th><th>Phone / WhatsApp</th><th>Attendance</th><th>Hackathon</th><th>Raffle</th><th>Team</th><th>Project idea</th></tr></thead><tbody data-admin-table="registrations"></tbody></table></div></section><section class="admin-section"><div class="admin-section-head"><h3>Final submissions</h3><input type="search" data-admin-search="submissions" placeholder="Search team, project, email…" aria-label="Search submissions"></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Submitted</th><th>Team</th><th>Leader</th><th>Other members</th><th>Project</th><th>One-liner</th><th>Description</th><th>Links</th></tr></thead><tbody data-admin-table="submissions"></tbody></table></div></section></section></div></div>`;
}

function value(form, name) { return form.elements.namedItem(name)?.value?.trim() || ""; }

function collectRegistration(form) {
  const team = [1, 2, 3].map((i) => ({ name: value(form, `member${i}Name`), email: value(form, `member${i}Email`), xHandle: value(form, `member${i}X`) }));
  return { firstName: value(form, "firstName"), lastName: value(form, "lastName"), email: value(form, "email"), phone: value(form, "phone"), youtubeFollowed: form.elements.namedItem("youtubeFollowed")?.checked ? "yes" : "no", raffleEntry: form.elements.namedItem("raffleEntry")?.checked ? "yes" : "no", instagramHandle: value(form, "instagramHandle"), tiktokHandle: value(form, "tiktokHandle"), attendance: value(form, "attendance"), hackathon: value(form, "hackathon"), track: value(form, "track"), team, idea: value(form, "idea"), bunn_hp: value(form, "bunn_hp") };
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
      const raffleNote = endpoint === "/api/register" ? " If you entered the raffle draw, your handles are recorded." : "";
      form.innerHTML = `<div class="form-success">${icon("circle-check")}<h2>${endpoint === "/api/register" ? "You’re registered." : "Project received."}</h2><p>Your details have been saved.${emailNote}${raffleNote} Keep this reference: <strong>${result.id}</strong></p><a href="/events">Back to events ${icon("arrow-right")}</a></div>`;
    } catch (error) {
      message.textContent = error.message;
      message.dataset.state = "error";
      button.disabled = false;
    }
  });
}

async function applyAvailability(form, kind) {
  if (!form) return;
  try {
    const response = await fetch("/api/forms/status", { cache: "no-store" });
    if (!response.ok) return;
    const status = await response.json();
    const open = kind === "registrations" ? status.registrationsOpen : status.submissionsOpen;
    if (open) return;
    const message = form.querySelector(".form-message");
    message.textContent = kind === "registrations" ? "Registration is currently closed." : "Project submissions are currently closed.";
    message.dataset.state = "error";
    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = true;
  } catch {
    // Availability is best-effort; the API still rejects closed forms.
  }
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
    const raffleEntry = registration.elements.namedItem("raffleEntry");
    const instagramHandle = registration.elements.namedItem("instagramHandle");
    const tiktokHandle = registration.elements.namedItem("tiktokHandle");
    function updateRaffle() {
      const active = raffleEntry.checked;
      instagramHandle.required = active;
      tiktokHandle.required = active;
      if (!active) {
        instagramHandle.value = "";
        tiktokHandle.value = "";
      }
    }
    raffleEntry.addEventListener("change", updateRaffle);
    for (const input of [instagramHandle, tiktokHandle]) {
      input.addEventListener("input", () => {
        if (input.value.trim()) {
          raffleEntry.checked = true;
          updateRaffle();
        }
      });
    }
    updateRaffle();
    update();
    bindForm(registration, "/api/register", collectRegistration);
    applyAvailability(registration, "registrations");
  }
  const projectForm = document.querySelector("#project-form");
  bindForm(projectForm, "/api/submit-project", collectSubmission);
  applyAvailability(projectForm, "submissions");
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

const registrationRow = (row) => `<tr><td class="admin-date">${formatDate(row.submittedAt)}</td><td>${escapeHtml(`${row.firstName || ""} ${row.lastName || ""}`.trim())}</td><td>${escapeHtml(row.email)}</td><td>${escapeHtml(row.phone)}</td><td>${escapeHtml(row.attendance === "virtual" ? "Virtual" : "Physical")}</td><td>${row.hackathon === "yes" ? `Yes${row.track ? ` — ${escapeHtml(row.track)}` : ""}` : "No"}</td><td>${row.raffleEntry ? `Yes${row.instagramHandle ? ` — IG @${escapeHtml(row.instagramHandle)}` : ""}${row.tiktokHandle ? ` · TikTok @${escapeHtml(row.tiktokHandle)}` : ""}` : "No"}</td><td>${Array.isArray(row.team) && row.team.length ? row.team.map(memberLine).join("<br>") : "—"}</td><td class="admin-wide">${escapeHtml(row.idea) || "—"}</td></tr>`;

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
  const exportButtons = [...document.querySelectorAll("[data-admin-export]")];
  const refreshButton = document.querySelector("[data-admin-refresh]");
  const lockButton = document.querySelector("[data-admin-lock]");
  const meta = document.createElement("meta");
  meta.name = "robots";
  meta.content = "noindex, nofollow";
  document.head.append(meta);

  const storageKey = "bunn.admin.key";
  let key = "";
  let data = { registrations: [], submissions: [] };
  let formStatus = { registrationsOpen: true, submissionsOpen: true };

  function render(kind) {
    const rows = data[kind] || [];
    const query = (document.querySelector(`[data-admin-search="${kind}"]`)?.value || "").trim().toLowerCase();
    const visible = query ? rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query)) : rows;
    const empty = kind === "registrations" ? "No registrations yet." : "No project submissions yet.";
    const columns = kind === "registrations" ? 9 : 8;
    tableBodies[kind].innerHTML = visible.length
      ? visible.map(kind === "registrations" ? registrationRow : submissionRow).join("")
      : `<tr><td colspan="${columns}" class="admin-empty">${query ? "No matching records." : empty}</td></tr>`;
  }

  function renderAll() {
    render("registrations");
    render("submissions");
    document.querySelector('[data-admin-count="registrations"]').textContent = data.registrations.length;
    document.querySelector('[data-admin-count="submissions"]').textContent = data.submissions.length;
    document.querySelector('[data-admin-count="hackathon"]').textContent = data.registrations.filter((row) => row.hackathon === "yes").length;
    document.querySelector('[data-admin-count="raffle"]').textContent = data.registrations.filter((row) => row.raffleEntry).length;
    updated.textContent = `Updated ${new Date().toLocaleString()}`;
  }

  function renderAvailability() {
    for (const kind of ["registrations", "submissions"]) {
      const open = kind === "registrations" ? formStatus.registrationsOpen : formStatus.submissionsOpen;
      const button = document.querySelector(`[data-admin-toggle="${kind}"]`);
      if (!button) continue;
      button.dataset.open = String(open);
      button.querySelector("[data-admin-status]").textContent = open ? "Open" : "Closed";
    }
  }

  async function load(nextKey, quiet = false) {
    if (!quiet) status.textContent = "Loading responses…";
    const headers = { Authorization: `Bearer ${nextKey}` };
    const [registrationsResponse, submissionsResponse, statusResponse] = await Promise.all([
      fetch("/api/admin/registrations", { headers, cache: "no-store" }),
      fetch("/api/admin/submissions", { headers, cache: "no-store" }),
      fetch("/api/admin/form-status", { headers, cache: "no-store" }),
    ]);
    if ([registrationsResponse, submissionsResponse, statusResponse].some((response) => response.status === 401)) throw new Error("Invalid organiser key.");
    if (!registrationsResponse.ok || !submissionsResponse.ok || !statusResponse.ok) throw new Error("Could not load the responses. Try again.");
    const [registrationsBody, submissionsBody, statusBody] = await Promise.all([registrationsResponse.json(), submissionsResponse.json(), statusResponse.json()]);
    key = nextKey;
    formStatus = statusBody;
    data = { registrations: registrationsBody.registrations || [], submissions: submissionsBody.submissions || [] };
    sessionStorage.setItem(storageKey, key);
    gate.hidden = true;
    panel.hidden = false;
    gateMessage.textContent = "";
    status.textContent = "";
    renderAll();
    renderAvailability();
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

  for (const button of exportButtons) {
    button.addEventListener("click", async () => {
      if (!key) return;
      const type = button.dataset.adminExport || "all";
      exportButtons.forEach((item) => { item.disabled = true; });
      status.textContent = type === "submissions"
        ? "Preparing hackathon projects…"
        : type === "registrations"
          ? "Preparing registrations…"
          : "Preparing the Excel file…";
      try {
        const endpoint = type === "all" ? "/api/export" : `/api/export/${type}`;
        const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${key}` } });
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || "Export failed.");
        }
        const url = URL.createObjectURL(await response.blob());
        const link = document.createElement("a");
        link.href = url;
        link.download = `blockchain-unn-${type === "all" ? "forms" : type}-${new Date().toISOString().slice(0, 10)}.xlsx`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
        status.textContent = "Excel file downloaded.";
      } catch (error) {
        status.textContent = error.message;
      } finally {
        exportButtons.forEach((item) => { item.disabled = false; });
      }
    });
  }

  for (const button of document.querySelectorAll("[data-admin-toggle]")) {
    button.addEventListener("click", async () => {
      if (!key) return;
      const kind = button.dataset.adminToggle;
      const field = kind === "registrations" ? "registrationsOpen" : "submissionsOpen";
      const next = { ...formStatus, [field]: !formStatus[field] };
      button.disabled = true;
      status.textContent = `Updating ${kind === "registrations" ? "registration" : "submission"} availability…`;
      try {
        const response = await fetch("/api/admin/form-status", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ registrationsOpen: next.registrationsOpen, submissionsOpen: next.submissionsOpen }),
        });
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || "Could not update form availability.");
        }
        formStatus = await response.json();
        renderAvailability();
        status.textContent = kind === "registrations"
          ? `Registrations are now ${formStatus.registrationsOpen ? "open" : "closed"}.`
          : `Project submissions are now ${formStatus.submissionsOpen ? "open" : "closed"}.`;
      } catch (error) {
        status.textContent = error.message;
      } finally {
        button.disabled = false;
      }
    });
  }

  const saved = sessionStorage.getItem(storageKey);
  if (saved) attempt(saved, true);
}
