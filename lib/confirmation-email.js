export async function sendRegistrationConfirmation(registration) {
  const { RESEND_API_KEY, CONFERENCE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONFERENCE_FROM_EMAIL) return false;
  const building = registration.hackathon === "yes";
  const title = building ? "Conference and hackathon registration" : "Conference registration";
  const details = building
    ? `Your ${registration.track} track registration and team details have been received.`
    : "Your conference registration has been received.";
  const attendanceLine = registration.attendance === "virtual"
    ? "The virtual conference joining details will follow."
    : "We look forward to seeing you on 13–14 November at Nsukka BlockHive.";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `bunn-registration-${registration.id}`,
    },
    body: JSON.stringify({
      from: CONFERENCE_FROM_EMAIL,
      to: [registration.email],
      subject: `Blockchain UNN — ${title}`,
      text: `Hi ${registration.firstName},\n\n${details}\n\n${attendanceLine}\n\nBlockchain UNN`,
    }),
  });
  if (!response.ok) throw new Error(`Confirmation email failed (${response.status})`);
  return true;
}
