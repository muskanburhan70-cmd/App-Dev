import React from "react";
import "./AttendancePage.css";

const sampleRecords = [
  { id: "A001", name: "Maria", date: "2025-12-01", status: "Present" },
  { id: "A002", name: "Ali Khan", date: "2025-12-01", status: "Absent" },
  { id: "A003", name: "Maryam", date: "2025-12-01", status: "Present" },
];

export default function AttendancePage() {
  return (
    <div className="attendance-wrapper">
      <h1 className="attendance-title">Attendance</h1>

      <div className="attendance-card">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleRecords.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.date}</td>
                <td className={r.status === "Present" ? "present" : "absent"}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
