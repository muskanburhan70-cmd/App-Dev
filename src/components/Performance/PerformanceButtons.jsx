import React from "react";

const PerformanceButtons = ({ onAddReview, onApprove }) => {
  return (
    <div style={{ display: "flex", gap: "50px", marginTop: "50px" }}>
      <button className="btn-primary" onClick={onAddReview}>
        Add Review
      </button>

      <button className="btn-primary" onClick={onApprove}>
        Approve Promotion
      </button>
    </div>
  );
};

export default PerformanceButtons;
