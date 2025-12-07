export const exportToCSV = (data) => {
  const headers = ["UID", "Name", "Status", "In-Time", "Out-Time"];
  const rows = data.map((r) => [
    r.uid,
    r.name,
    r.status,
    r.inTime || "-",
    r.outTime || "-",
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "attendance_report.csv");
  document.body.appendChild(link);
  link.click();
};
