import React, { useState } from "react";
import "./EmployeePortal.css";

function EmployeePortal() {
  const [employeeInfo] = useState({
    id: "EMP001",
    name: "John Doe",
    department: "IT",
    position: "Software Engineer",
    email: "john.doe@bareera.com",
    phone: "+92 300 1234567",
    joinDate: "January 15, 2023",
  });

  const [leaveRequests] = useState([
    { id: 1, type: "Sick Leave", from: "2024-12-10", to: "2024-12-12", status: "Pending" },
    { id: 2, type: "Annual Leave", from: "2024-11-20", to: "2024-11-22", status: "Approved" },
  ]);

  const [attendanceRecords] = useState([
    { date: "2024-12-06", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present" },
    { date: "2024-12-05", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "Present" },
    { date: "2024-12-04", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present" },
  ]);

  return (
    <div className="employee-portal">
      <div className="portal-container">
        <h1 className="portal-title">Employee Portal</h1>

        {/* Employee Info Card */}
        <div className="info-card">
          <h2>My Profile</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Employee ID:</span>
              <span className="info-value">{employeeInfo.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{employeeInfo.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Department:</span>
              <span className="info-value">{employeeInfo.department}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Position:</span>
              <span className="info-value">{employeeInfo.position}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{employeeInfo.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{employeeInfo.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Join Date:</span>
              <span className="info-value">{employeeInfo.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Leave Requests Section */}
        <div className="section-card">
          <h2>My Leave Requests</h2>
          <button className="portal-btn">Request New Leave</button>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.type}</td>
                  <td>{leave.from}</td>
                  <td>{leave.to}</td>
                  <td>
                    <span className={`status-badge ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance Records Section */}
        <div className="section-card">
          <h2>My Attendance</h2>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>
                    <span className="status-badge present">
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeePortal;
