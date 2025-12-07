import React from "react";

const PerformanceTable = ({ employees }) => {
  return (
    <div className="performance-table">
      <div className="performance-header">
        <span>UID</span>
        <span>Name</span>
        <span>Review</span>
        <span>Promotion</span>
      </div>

      {employees.map((emp) => (
        <div key={emp.uid} className="performance-row">
          <span>{emp.uid}</span>
          <span>{emp.name}</span>
          <span>{emp.review}</span>
          <span>{emp.promotion}</span>
        </div>
      ))}
    </div>
  );
};

export default PerformanceTable;
