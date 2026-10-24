import { icon } from "./icons.js";

const field = (label, name, type = "text", options = {}) => `<label class="form-field${options.wide ? " form-field-wide" : ""}"><span>${label}${options.optional ? ' <small>Optional</small>' : ""}</span>${options.multiline ? `<textarea name="${name}" rows="${options.rows || 4}" maxlength="${options.max || 2000}" ${options.optional ? "" : "required"} placeholder="${options.placeholder || ""}"></textarea>` : `<input name="${name}" type="${type}" ${options.optional ? "" : "required"} maxlength="${options.max || 200}" ${options.autocomplete ? `autocomplete="${options.autocomplete}"` : ""} placeholder="${options.placeholder || ""}">`}</label>`;

const radio = (name, value, title, description = "") => `<label class="choice-card"><input type="radio" name="${name}" value="${value}" required><span><strong>${title}</strong>${description ? `<small>${description}</small>` : ""}</span></label>`;

const memberFields = (number, title, optional = false) => `<fieldset class="member-fields" data-member="${number}"><legend>${title} ${optional ? "<small>Optional</small>" : ""}</legend><div class="form-grid">${field("First and last name", `member${number}Name`, "text", { optional, max: 120, autocomplete: "name" })}${field("Email address", `member${number}Email`, "email", { optional, max: 254, autocomplete: "email" })}${field("X (Twitter) handle", `member${number}X`, "text", { optional, max: 50, placeholder: "@yourhandle" })}</div></fieldset>`;

const formIntro = (eyebrow, title, body) => `<div class="form-intro"><span class="form-eyebrow">${eyebrow}</span><h1>${title}</h1><p>${body}</p></div>`;

export function registrationPage() {
  return `<div class="forms-page"><div class="forms-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a>${formIntro("CONFERENCE 5.0 · 12—14 NOVEMBER", "Conference &amp; Hackathon Registration", "Join us at Nsukka BlockHive. Register for the conference, and tell us if you want to build in the hackathon.")}<div class="form-layout"><aside class="form-aside"><div class="form-aside-icon">${icon("calendar-days")}</div><span class="form-eyebrow">THE EVENT</span><h2>Intelligence Without Borders</h2><p>Two days of conversations, collaboration and building at the intersection of AI and Web3.</p><div class="form-event-meta"><span>${icon("calendar-days")} 13–14 November</span><span>${icon("map-pin")} Nsukka BlockHive</span><span>${icon("users-round")} Attend in person or join the virtual conference</span></div><a href="/submit-project">Already building? Submit your project ${icon("arrow-right")}</a></aside><form id="register-form" class="event-form"><div class="form-section-heading"><span>01 / 02</span><div><h2>Your details</h2><p>We’ll use these to confirm your place and contact you about the event.</p></div></div><div class="form-grid">${field("First name", "firstName", "text", { max: 80, autocomplete: "given-name" })}${field("Last name", "lastName", "text", { max: 80, autocomplete: "family-name" })}${field("Email address", "email", "email", { max: 254, autocomplete: "email" })}${field("Phone number / WhatsApp", "phone", "tel", { max: 30, autocomplete: "tel", placeholder: "+234…" })}</div><fieldset class="form-question"><legend>Will you be physically present for the hackathon and conference on 13–14 November at Nsukka BlockHive?</legend><div class="choice-grid">${radio("attendance", "physical", "Yes, I’ll be there physically")}${radio("attendance", "virtual", "No, I’ll attend the virtual conference only")}</div></fieldset><fieldset class="form-question"><legend>Do you want to participate in the hackathon?</legend><div class="choice-grid">${radio("hackathon", "no", "No", "Conference registration only")}${radio("hackathon", "yes", "Yes", "Show hackathon registration details")}</div><p id="attendance-hint" class="form-hint" hidden>Hackathon participants need to attend in person. Choose physical attendance to continue.</p></fieldset><fieldset id="hackathon-fields" class="hackathon-fields" disabled hidden><div class="form-section-heading"><span>02 / 02</span><div><h2>Build with us</h2><p>Choose a track, add your team and tell us what you plan to make.</p></div></div><fieldset class="form-question"><legend>Which hackathon category do you want to participate in?</legend><div class="choice-grid">${radio("track", "AI", "AI Track")}${radio("track", "Web3", "Web3 Track", "Build with Pollar or Zcash")}</div></fieldset><div id="web3-info" class="track-info" hidden><strong>${icon("trophy")} Web3 track information</strong><p>Build on Pollar or Zcash—you can choose either.</p><div><span>Zcash bounty <b>Up to $500</b></span><span>Pollar bounty <b>Up to $300</b></span></div></div><div class="form-subheading"><h3>Team details</h3><p>Maximum of three people per team, including the leader.</p></div>${memberFields(1, "Team leader")}${memberFields(2, "Team member 2", true)}${memberFields(3, "Team member 3", true)}<div class="form-subheading"><h3>Project details</h3><p>A brief idea is enough—you can refine it as you build.</p></div><div class="form-grid">${field("What are you working on or what do you want to work on?", "idea", "text", { wide: true, multiline: true, max: 2000, placeholder: "Tell us the problem and the idea behind your project…" })}</div></fieldset><div class="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><div class="form-submit-row"><p>We’ll use these details only to manage this event and contact you about your registration.</p><button type="submit" class="form-submit">Register ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form></div></div></div>`;
}

export function submissionPage() {
  return `<div class="forms-page"><div class="forms-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a>${formIntro("CONFERENCE 5.0 HACKATHON · FINAL SUBMISSION", "Submit your project", "Show us what your team built during the hackathon. Submit the work you have, even if it is still in progress.")}<div class="submission-note">${icon("lightbulb")}<p><strong>Builders, submit what you have.</strong> Your project does not need to be 100% finished or bug-free. What matters is what you built during the hackathon.</p></div><form id="project-form" class="event-form submission-form"><div class="form-section-heading"><span>01 / 03</span><div><h2>Your team</h2><p>Tell us who is behind the project.</p></div></div><div class="form-grid">${field("Team name", "teamName", "text", { max: 120 })}${field("Team leader name", "leaderName", "text", { max: 120, autocomplete: "name" })}${field("Team leader email", "leaderEmail", "email", { max: 254, autocomplete: "email" })}${field("Other team members (names and X handles)", "otherMembers", "text", { wide: true, optional: true, multiline: true, rows: 3, max: 1000 })}</div><div class="form-section-heading"><span>02 / 03</span><div><h2>Your project</h2><p>Explain what it does and why it matters.</p></div></div><div class="form-grid">${field("Project name", "projectName", "text", { max: 120 })}${field("Project one-liner", "oneLiner", "text", { wide: true, max: 240, placeholder: "Describe your project in one sentence" })}${field("Project description", "description", "text", { wide: true, multiline: true, rows: 5, max: 3000, placeholder: "What problem does it solve, and how does it work?" })}</div><div class="form-section-heading"><span>03 / 03</span><div><h2>Project links</h2><p>Share links that reviewers can open without requesting access. A demo video is optional but recommended.</p></div></div><div class="form-grid">${field("Pitch deck link (Google Slides, Canva or PDF)", "pitchDeckUrl", "url", { wide: true, max: 2000, placeholder: "https://…" })}${field("Codebase / GitHub repo", "codeUrl", "url", { wide: true, max: 2000, placeholder: "https://github.com/…" })}${field("Demo video link", "demoUrl", "url", { wide: true, optional: true, max: 2000, placeholder: "https://…" })}${field("Live / deployment link", "liveUrl", "url", { wide: true, optional: true, max: 2000, placeholder: "https://…" })}</div><div class="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><div class="form-submit-row"><p>Check that your pitch deck and codebase links are accessible to reviewers.</p><button type="submit" class="form-submit">Submit project ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form></div></div>`;
}

export function exportPage() {
  return `<div class="forms-page"><div class="forms-shell export-shell"><a class="form-back" href="/events">${icon("arrow-left")} Back to events</a>${formIntro("ORGANISER ACCESS", "Download form responses", "Enter the export key to download registrations and final submissions in one Excel workbook.")}<form id="export-form" class="event-form"><label class="form-field"><span>Export key</span><input name="key" type="password" autocomplete="off" required></label><div class="form-submit-row"><p>The key is never saved in your browser.</p><button type="submit" class="form-submit">Download Excel ${icon("arrow-right")}</button></div><p class="form-message" role="alert" aria-live="polite"></p></form></div></div>`;
}

function value(form, name) { return form.elements.namedItem(name)?.value?.trim() || ""; }

function collectRegistration(form) {
  const team = [1, 2, 3].map((i) => ({ name: value(form, `member${i}Name`), email: value(form, `member${i}Email`), xHandle: value(form, `member${i}X`) }));
  return { firstName: value(form, "firstName"), lastName: value(form, "lastName"), email: value(form, "email"), phone: value(form, "phone"), attendance: value(form, "attendance"), hackathon: value(form, "hackathon"), track: value(form, "track"), team, idea: value(form, "idea"), website: value(form, "website") };
}

function collectSubmission(form) {
  return Object.fromEntries(["teamName", "leaderName", "leaderEmail", "otherMembers", "projectName", "oneLiner", "description", "pitchDeckUrl", "codeUrl", "demoUrl", "liveUrl", "website"].map((name) => [name, value(form, name)]));
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
  document.querySelector("#export-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector('button[type="submit"]');
    const message = form.querySelector(".form-message");
    button.disabled = true;
    message.textContent = "Preparing the Excel file…";
    message.dataset.state = "pending";
    try {
      const response = await fetch("/api/export", { method: "POST", headers: { Authorization: `Bearer ${value(form, "key")}` } });
      if (!response.ok) throw new Error((await response.json()).error || "Export failed.");
      const file = await response.blob();
      const href = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = href;
      link.download = `blockchain-unn-forms-${new Date().toISOString().slice(0, 10)}.xlsx`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(href), 60_000);
      form.reset();
      message.textContent = "Excel file downloaded.";
      message.dataset.state = "success";
    } catch (error) {
      message.textContent = error.message;
      message.dataset.state = "error";
    } finally {
      button.disabled = false;
    }
  });
}
