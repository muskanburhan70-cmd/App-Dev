import React from "react";
import "./EmployeeSelfService.css";

const EmployeeSelfService = () => {

  const handleClick = (name) => {
    alert(`${name} clicked`);
  };

  return (
    <div className="ess-container">
      <h1 className="ess-title">Employee Self - Service portal</h1>

      <div className="ess-grid">
        <button className="ess-btn" onClick={() => handleClick("Payslip")}>
          View Payslip
        </button>

        <button className="ess-btn" onClick={() => handleClick("Leave Balance")}>
          Check Leave Balance
        </button>

        <button className="ess-btn" onClick={() => handleClick("Attendance")}>
          View Attendance
        </button>

        <button className="ess-btn" onClick={() => handleClick("Update Profile")}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default EmployeeSelfService;
