import React, { useState } from "react";
import PerformanceTable from "./PerformanceTable";
import PerformanceButtons from "./PerformanceButtons";
import Modal from "../Modal";
import "./performance.css";

const PerformancePage = () => {
  const [employees, setEmployees] = useState([
    {
      uid: "001",
      name: "Ayesha",
      review: "Excellent",
      promotion: "Recommended",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    setModalOpen(true);
  };

  const saveReview = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.uid === "001" ? { ...emp, review: newReview } : emp
      )
    );

    setModalOpen(false);
  };

  const approvePromotion = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.uid === "001" ? { ...emp, promotion: "Approved" } : emp
      )
    );
  };

  return (
    <div className="performance-wrapper">
      <h1 className="performance-title">Performance</h1>

      <PerformanceTable employees={employees} />

      <PerformanceButtons
        onAddReview={handleAddReview}
        onApprove={approvePromotion}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3>Add Review</h3>
          <input
            type="text"
            placeholder="Enter review"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <br />
          <button
            className="btn-primary"
            style={{ marginTop: "15px" }}
            onClick={saveReview}
          >
            Save
          </button>
        </Modal>
      )}
    </div>
  );
};

export default PerformancePage;
