import React, { useState, useEffect } from "react";
import PerformanceTable from "./PerformanceTable";
import PerformanceButtons from "./PerformanceButtons";
import Modal from "../Modal";
import "./performance.css";
import { performanceService } from "../../appwrite";

const PerformancePage = () => {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    employeeId: "",
    employeeName: "",
    reviewPeriod: "",
    rating: 0,
    comments: "",
    goals: "",
  });

  const loadPerformances = async () => {
    try {
      const data = await performanceService.getPerformances();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to load performance reviews:", error);
      alert("Failed to load performance reviews. Please try again.");
    }
  };

  // Load performance reviews from Appwrite on component mount
  useEffect(() => {
    loadPerformances();
  }, []);

  const handleAddReview = () => {
    setNewReview({
      employeeId: "",
      employeeName: "",
      reviewPeriod: "",
      rating: 0,
      comments: "",
      goals: "",
    });
    setModalOpen(true);
  };

  const saveReview = async () => {
    try {
      await performanceService.createReview(newReview);
      await loadPerformances(); // Reload to ensure sync
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save review:", error);
      alert("Failed to save review. Please try again.");
    }
  };

  const approvePromotion = async (employeeId) => {
    try {
      // Find the performance record
      const performance = employees.find((emp) => emp.employeeId === employeeId);
      if (performance && performance.$id) {
        await performanceService.updatePerformance(performance.$id, {
          promotion: "Approved"
        });
        await loadPerformances(); // Reload to ensure sync
      }
    } catch (error) {
      console.error("Failed to approve promotion:", error);
      alert("Failed to approve promotion. Please try again.");
    }
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
          <h3>Add Performance Review</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="Employee ID"
              value={newReview.employeeId}
              onChange={(e) => setNewReview({ ...newReview, employeeId: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Employee Name"
              value={newReview.employeeName}
              onChange={(e) => setNewReview({ ...newReview, employeeName: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Review Period (e.g., Q4 2025)"
              value={newReview.reviewPeriod}
              onChange={(e) => setNewReview({ ...newReview, reviewPeriod: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              placeholder="Comments"
              value={newReview.comments}
              onChange={(e) => setNewReview({ ...newReview, comments: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                minHeight: "80px",
              }}
            />
            <textarea
              placeholder="Goals"
              value={newReview.goals}
              onChange={(e) => setNewReview({ ...newReview, goals: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                minHeight: "80px",
              }}
            />
          </div>
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
