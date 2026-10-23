import ExcelJS from "exceljs";

const safe = (value) => {
  const text = value == null ? "" : String(value);
  if (/^\+\d[\d\s()-]*$/.test(text)) return text;
  return /^[\s]*[=+\-@\t\r]/.test(text) ? `'${text}` : text;
};

function addSheet(workbook, name, columns, records, toRow) {
  const sheet = workbook.addWorksheet(name, { views: [{ state: "frozen", ySplit: 1 }] });
  sheet.columns = columns.map(([header, width]) => ({ header, key: header, width }));
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0E4104" } };
  sheet.getRow(1).alignment = { vertical: "middle", wrapText: true };
  sheet.getRow(1).height = 34;
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columns.length } };
  for (const record of records) {
    const row = sheet.addRow(toRow(record).map(safe));
    row.alignment = { vertical: "top", wrapText: true };
    row.height = 32;
  }
  return sheet;
}

export async function createWorkbook(registrations, submissions) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Blockchain UNN";
  workbook.created = new Date();
  addSheet(workbook, "Registrations", [
    ["Submission ID", 38], ["Submitted at (UTC)", 25], ["First name", 20], ["Last name", 20],
    ["Email", 34], ["Phone / WhatsApp", 23], ["Attendance", 16], ["Hackathon", 15], ["Track", 13],
    ["Leader name", 24], ["Leader email", 34], ["Leader X", 18],
    ["Member 2 name", 24], ["Member 2 email", 34], ["Member 2 X", 18],
    ["Member 3 name", 24], ["Member 3 email", 34], ["Member 3 X", 18], ["Project idea", 65],
  ], registrations, (r) => [
    r.id, r.submittedAt, r.firstName, r.lastName, r.email, r.phone, r.attendance, r.hackathon, r.track,
    r.team?.[0]?.name, r.team?.[0]?.email, r.team?.[0]?.xHandle,
    r.team?.[1]?.name, r.team?.[1]?.email, r.team?.[1]?.xHandle,
    r.team?.[2]?.name, r.team?.[2]?.email, r.team?.[2]?.xHandle, r.idea,
  ]);
  addSheet(workbook, "Final submissions", [
    ["Submission ID", 38], ["Submitted at (UTC)", 25], ["Team name", 25],
    ["Leader name", 25], ["Leader email", 34], ["Other team members", 45],
    ["Project name", 25], ["One-liner", 55], ["Description", 75],
    ["Pitch deck", 60], ["Codebase", 60], ["Demo video", 60], ["Live link", 60],
  ], submissions, (r) => [
    r.id, r.submittedAt, r.teamName, r.leaderName, r.leaderEmail, r.otherMembers,
    r.projectName, r.oneLiner, r.description, r.pitchDeckUrl, r.codeUrl, r.demoUrl, r.liveUrl,
  ]);
  return Buffer.from(await workbook.xlsx.writeBuffer());
}
