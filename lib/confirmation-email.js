import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";

const CONFERENCE_GROUP = "https://chat.whatsapp.com/JREkt6qsJRz4MneHA2sD7C?s=cl&p=a&mlu=4&ilr=4";
const HACKATHON_GROUP = "https://chat.whatsapp.com/GIB47lclaOM1YkbeEK5twB?s=cl&p=a&mlu=4&ilr=4";
const WEBSITE = "https://blockchainunn.org/register";
const FLYER_URL = "https://www.blockchainunn.org/images/email/conference-5-flyer.jpg";
const FLYER_FILE = "BlockchainUNN-Conference-5.0-Flyer.jpg";

let gmailTransport;

function flyerPath() {
  return path.join(process.cwd(), "public/images/email/conference-5-flyer.jpg");
}

function sender() {
  return {
    name: (process.env.MAIL_FROM_NAME || "The BlockchainUNN Team").trim(),
    email: (process.env.MAIL_FROM || process.env.FROM_MAIL || process.env.GMAIL_SENDER_MAIL || "").trim(),
  };
}

function brevoSender() {
  const from = sender();
  return {
    name: (process.env.BREVO_SENDER_NAME || from.name).trim(),
    email: (process.env.BREVO_SENDER_EMAIL || from.email).trim(),
  };
}

function gmailSender() {
  const from = sender();
  return {
    name: from.name,
    email: (process.env.GMAIL_FROM_EMAIL || from.email).trim(),
  };
}

function getGmailTransport() {
  if (gmailTransport) return gmailTransport;
  const user = (process.env.GMAIL_SENDER_MAIL || "").trim();
  // Google displays app passwords in groups of four; strip the display spaces.
  const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  if (!user || !pass) return null;
  gmailTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return gmailTransport;
}

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

export function buildRegistrationEmail(registration) {
  const firstName = (registration.firstName || "").trim();
  const greeting = firstName ? `Hello ${firstName},` : "Hello,";
  const htmlGreeting = firstName ? `Hello ${escapeHtml(firstName)},` : "Hello,";
  const subject = "BlockchainUNN Conference 5.0 — Registration Confirmed";

  const text = `${greeting}

Thank you for registering for BlockchainUNN Conference 5.0: Intelligence Without Borders!

We're excited to have you join us for an experience bringing together students, developers, innovators, and Web3 enthusiasts to learn, build, connect, and explore the future of technology.

To stay updated and receive important announcements, please join the relevant community below.

1. Conference Community
Join the conference group for event updates, speaker announcements, schedules, networking opportunities, and other important information.
Join the Conference Group: ${CONFERENCE_GROUP}

2. Hackathon Group
Are you participating in the hackathon? Join the dedicated hackathon group for team coordination, challenge announcements, submission guidelines, mentorship updates, and other hackathon-related information.
Join the Hackathon Group: ${HACKATHON_GROUP}

Please note: Join the hackathon group if you intend to participate in the hackathon. You can join both groups if you're participating in both activities.

We look forward to having you at BlockchainUNN Conference 5.0 as we build, learn, and create Intelligence Without Borders.

Stay connected, stay ready, and see you at the conference!

Best regards,
The BlockchainUNN Team
Website: ${WEBSITE}

Event details:
- Thu 12 Nov, 10:00 AM — Virtual Conference (YouTube)
- Fri 13 Nov, 10:00 AM — Dev Workshop & Hackathon, The Block Hive
- Sat 14 Nov, 10:00 AM — Hackathon Demo Day & Anniversary, The Block Hive
Over ₦1,000,000 in hackathon bounties.
Conference flyer: ${FLYER_URL}`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#0b1d0b;font-family:Arial,Helvetica,sans-serif;color:#173015;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b1d0b;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;">
<tr><td style="background:#0e4104;padding:28px 32px;text-align:center;">
  <div style="color:#ffcd40;font-size:11px;letter-spacing:2px;font-weight:bold;">BLOCKCHAINUNN CONFERENCE 5.0</div>
  <div style="color:#ffffff;font-size:29px;line-height:1.15;font-weight:bold;margin-top:8px;">Intelligence Without Borders</div>
  <div style="color:#cfe0c9;font-size:12px;margin-top:10px;">Thursday 12 – Saturday 14 November 2026</div>
</td></tr>
<tr><td style="padding:32px;">
  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;">${htmlGreeting}</p>
  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Thank you for registering for <strong>BlockchainUNN Conference 5.0: Intelligence Without Borders!</strong></p>
  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We're excited to have you join us for an experience bringing together students, developers, innovators, and Web3 enthusiasts to learn, build, connect, and explore the future of technology.</p>
  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;">To stay updated and receive important announcements, please join the relevant community below.</p>
  <div style="background:#f7faf5;border-left:4px solid #ffcd40;padding:14px 18px;margin:20px 0;font-size:13px;line-height:1.7;color:#32422e;">
    <strong style="color:#0e4104;">Event details</strong><br>
    Thu 12 Nov · 10:00 AM · Virtual Conference (YouTube)<br>
    Fri 13 Nov · 10:00 AM · Dev Workshop &amp; Hackathon · The Block Hive<br>
    Sat 14 Nov · 10:00 AM · Hackathon Demo Day &amp; Anniversary · The Block Hive
  </div>
  <div style="border:1px solid #dbe7d7;border-radius:12px;padding:20px;margin:24px 0;background:#f7faf5;">
    <h2 style="margin:0 0 10px;font-size:19px;line-height:1.3;color:#0e4104;">1. Conference Community</h2>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.65;color:#32422e;">Join the conference group for event updates, speaker announcements, schedules, networking opportunities, and other important information.</p>
    <a href="${CONFERENCE_GROUP}" style="display:inline-block;background:#0e4104;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 18px;border-radius:8px;">Join the Conference Group &rarr;</a>
  </div>
  <div style="border:1px solid #dbe7d7;border-radius:12px;padding:20px;margin:24px 0;background:#f7faf5;">
    <h2 style="margin:0 0 10px;font-size:19px;line-height:1.3;color:#0e4104;">2. Hackathon Group</h2>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.65;color:#32422e;">Are you participating in the hackathon? Join the dedicated hackathon group for team coordination, challenge announcements, submission guidelines, mentorship updates, and other hackathon-related information.</p>
    <a href="${HACKATHON_GROUP}" style="display:inline-block;background:#ffcd40;color:#173015;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 18px;border-radius:8px;">Join the Hackathon Group &rarr;</a>
  </div>
  <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#32422e;font-style:italic;">Please note: Join the hackathon group if you intend to participate in the hackathon. You can join both groups if you're participating in both activities.</p>
  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We look forward to having you at BlockchainUNN Conference 5.0 as we build, learn, and create <strong>Intelligence Without Borders</strong>.</p>
  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Stay connected, stay ready, and see you at the conference!</p>
  <p style="margin:0;font-size:15px;line-height:1.65;">Best regards,<br><strong>The BlockchainUNN Team</strong><br><a href="${WEBSITE}" style="color:#0e4104;">blockchainunn.org/register</a></p>
  <div style="border-top:1px solid #e2e8df;margin-top:28px;padding-top:20px;text-align:center;">
    <a href="${FLYER_URL}" style="text-decoration:none;"><img src="${FLYER_URL}" alt="BlockchainUNN Conference 5.0 flyer" width="576" style="max-width:100%;height:auto;border:0;border-radius:10px;display:block;margin:0 auto;"></a>
    <p style="margin:12px 0 0;font-size:12px;line-height:1.6;color:#6b7a67;">Conference flyer · Over ₦1,000,000 in hackathon bounties</p>
  </div>
</td></tr>
<tr><td style="background:#f2f6ef;padding:18px 32px;text-align:center;color:#6b7a67;font-size:11px;line-height:1.6;">
  BlockchainUNN · University of Nigeria, Nsukka<br>
  You received this email because you registered for BlockchainUNN Conference 5.0.
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}

async function sendWithBrevo(registration, email) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return false;
  const from = brevoSender();
  if (!from.email) throw new Error("No sender address configured for Brevo");
  let attachment;
  try {
    const content = await readFile(flyerPath());
    attachment = [{ name: FLYER_FILE, content: content.toString("base64") }];
  } catch {
    attachment = undefined;
  }
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: from,
      to: [{ email: registration.email, name: `${registration.firstName || ""} ${registration.lastName || ""}`.trim() }],
      replyTo: from,
      subject: email.subject,
      htmlContent: email.html,
      textContent: email.text,
      ...(attachment ? { attachment } : {}),
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Brevo send failed (${response.status}): ${detail.slice(0, 300)}`);
  }
  return true;
}

async function sendWithGmail(registration, email) {
  const transport = getGmailTransport();
  if (!transport) return false;
  const from = gmailSender();
  if (!from.email) throw new Error("No sender address configured for Gmail");
  const attachments = existsSync(flyerPath())
    ? [{ filename: FLYER_FILE, path: flyerPath(), contentType: "image/jpeg" }]
    : [];
  const info = await transport.sendMail({
    from: `"${from.name}" <${from.email}>`,
    to: registration.email,
    replyTo: from.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
    attachments,
  });
  if (info.rejected?.length || !info.accepted?.length) {
    throw new Error(`Gmail did not accept the message (${(info.rejected || []).join(", ") || "no recipients accepted"})`);
  }
  return true;
}

export async function sendRegistrationConfirmation(registration) {
  if (!registration?.email) return false;
  const email = buildRegistrationEmail(registration);
  if (process.env.BREVO_API_KEY) return sendWithBrevo(registration, email);
  return sendWithGmail(registration, email);
}
