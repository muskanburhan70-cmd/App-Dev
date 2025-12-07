import React from "react";

const DateFilter = ({ selectedDate, onDateChange }) => {
  return (
    <div style={{ 
      marginBottom: "20px",
      animation: "slideInRight 0.6s ease-out",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .date-icon {
          font-size: 24px;
          transition: transform 0.3s;
          cursor: pointer;
        }
        
        .date-icon:hover {
          animation: rotate 0.6s ease-in-out;
        }
      `}</style>
      <span className="date-icon">📅</span>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "2px solid #b85b7a",
          outline: "none",
          transition: "all 0.3s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#8b3a5b";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(184, 91, 122, 0.2)";
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#b85b7a";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      />
    </div>
  );
};

export default DateFilter;
