import React from "react";

const AttendanceTable = ({ records }) => {
  return (
    <div style={{
      animation: "fadeInUp 0.8s ease-out",
      background: "white",
      borderRadius: "15px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .attendance-row {
          transition: all 0.3s ease;
          animation: slideInLeft 0.5s ease-out;
        }
        
        .attendance-row:hover {
          background: #fce4ec !important;
          transform: scale(1.02);
          box-shadow: 0 2px 8px rgba(180, 80, 116, 0.2);
        }
        
        .status-badge {
          padding: 6px 12px;
          borderRadius: 20px;
          fontWeight: bold;
          fontSize: 14px;
          display: inline-block;
          animation: popIn 0.4s ease-out;
        }
        
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .attendance-table th {
          animation: fadeInDown 0.6s ease-out;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <table className="attendance-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ height: "50px", borderBottom: "2px solid #ccc" }}>
            <th>UID</th>
            <th>Name</th>
            <th>Status</th>
            <th>In - Time</th>
            <th>Out - Time</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec, index) => (
            <tr
              key={rec.uid}
              className="attendance-row"
              style={{ 
                height: "50px", 
                borderBottom: "1px solid #ccc",
                animationDelay: `${index * 0.1}s`
              }}
            >
              <td style={{ padding: "10px", textAlign: "center" }}>{rec.uid}</td>
              <td style={{ padding: "10px", fontWeight: "500" }}>{rec.name}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <span 
                  className="status-badge"
                  style={{
                    background: rec.status === "Present" ? "#c8e6c9" : 
                               rec.status === "Absent" ? "#ffcdd2" : "#ffe0b2",
                    color: rec.status === "Present" ? "#2e7d32" : 
                           rec.status === "Absent" ? "#c62828" : "#f57c00",
                  }}
                >
                  {rec.status}
                </span>
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>{rec.inTime ? rec.inTime : "-"}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>{rec.outTime ? rec.outTime : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
