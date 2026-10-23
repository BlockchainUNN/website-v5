const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlPattern = /^https?:\/\//i;

export class FormError extends Error {
  constructor(message) {
    super(message);
    this.name = "FormError";
  }
}

function text(value, label, max = 200, required = true) {
  const cleaned = typeof value === "string" ? value.trim() : "";
  if (required && !cleaned) throw new FormError(`${label} is required.`);
  if (cleaned.length > max) throw new FormError(`${label} is too long.`);
  return cleaned;
}

function email(value, label, required = true) {
  const cleaned = text(value, label, 254, required).toLowerCase();
  if (cleaned && !emailPattern.test(cleaned)) throw new FormError(`Enter a valid ${label.toLowerCase()}.`);
  return cleaned;
}

function url(value, label, required = true) {
  const cleaned = text(value, label, 2000, required);
  if (!cleaned) return "";
  try {
    const parsed = new URL(cleaned);
    if (!urlPattern.test(cleaned) || !["http:", "https:"].includes(parsed.protocol)) throw new Error();
  } catch {
    throw new FormError(`Enter a valid link for ${label.toLowerCase()}.`);
  }
  return cleaned;
}

function choice(value, label, choices) {
  if (!choices.includes(value)) throw new FormError(`Choose ${label.toLowerCase()}.`);
  return value;
}

function member(value, label, required = false) {
  const fields = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const supplied = Object.values(fields).some((field) => typeof field === "string" && field.trim());
  if (!required && !supplied) return null;
  return {
    name: text(fields.name, `${label} name`, 120),
    email: email(fields.email, `${label} email`),
    xHandle: text(fields.xHandle, `${label} X handle`, 50),
  };
}

export function validateRegistration(input) {
  if (input.website) throw new FormError("Unable to accept this request.");
  const attendance = choice(input.attendance, "attendance", ["physical", "virtual"]);
  const hackathon = choice(input.hackathon, "hackathon participation", ["yes", "no"]);
  if (attendance === "virtual" && hackathon === "yes") {
    throw new FormError("Hackathon participants need to attend in person.");
  }
  const registration = {
    firstName: text(input.firstName, "First name", 80),
    lastName: text(input.lastName, "Last name", 80),
    email: email(input.email, "Email address"),
    phone: text(input.phone, "Phone number / WhatsApp", 30),
    attendance,
    hackathon,
    track: "",
    team: [],
    idea: "",
  };
  if (hackathon === "yes") {
    registration.track = choice(input.track, "a hackathon track", ["AI", "Web3"]);
    const team = Array.isArray(input.team) ? input.team : [];
    if (team.length > 3) throw new FormError("A team can have no more than three members.");
    registration.team = [member(team[0], "Team leader", true), member(team[1], "Team member 2"), member(team[2], "Team member 3")].filter(Boolean);
    const emails = registration.team.map((person) => person.email);
    if (new Set(emails).size !== emails.length) throw new FormError("Each team member needs a different email address.");
    registration.idea = text(input.idea, "Project idea", 2000);
  }
  return registration;
}

export function validateSubmission(input) {
  if (input.website) throw new FormError("Unable to accept this request.");
  return {
    teamName: text(input.teamName, "Team name", 120),
    leaderName: text(input.leaderName, "Team leader name", 120),
    leaderEmail: email(input.leaderEmail, "Team leader email"),
    otherMembers: text(input.otherMembers, "Other team members", 1000, false),
    projectName: text(input.projectName, "Project name", 120),
    oneLiner: text(input.oneLiner, "Project one-liner", 240),
    description: text(input.description, "Project description", 3000),
    pitchDeckUrl: url(input.pitchDeckUrl, "Pitch deck"),
    codeUrl: url(input.codeUrl, "Codebase / GitHub repo"),
    demoUrl: url(input.demoUrl, "Demo video", false),
    liveUrl: url(input.liveUrl, "Live / deployment", false),
  };
}
