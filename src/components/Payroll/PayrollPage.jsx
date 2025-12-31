import React, { useState, useEffect } from "react";
import "./PayrollPage.css";
import { payrollService } from "../../appwrite";

export default function PayrollPage() {
  const [payslips, setPayslips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPayslip, setEditingPayslip] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: "",
    month: "",
    basicSalary: 0,
    bonus: 0,
    deductions: 0,
  });

  const loadPayrolls = async () => {
    try {
      const data = await payrollService.getPayrolls();
      console.log("Loaded payrolls:", data);
      setPayslips(data);
    } catch (error) {
      console.error("Failed to load payrolls:", error);
      console.error("Error details:", error.message, error.code);
      alert(`Failed to load payrolls: ${error.message}`);
    }
  };

  // Load payrolls from Appwrite on component mount
  useEffect(() => {
    loadPayrolls();
  }, []);

  const calculateNet = (basic, bonus, deductions) => {
    return parseFloat(basic) + parseFloat(bonus) - parseFloat(deductions);
  };

  const handleAdd = () => {
    setEditingPayslip(null);
    setFormData({
      employeeName: "",
      month: "",
      basicSalary: 0,
      bonus: 0,
      deductions: 0,
    });
    setShowModal(true);
  };

  const handleEdit = (payslip) => {
    setEditingPayslip(payslip);
    setFormData({
      employeeName: payslip.employeeName,
      month: payslip.month,
      basicSalary: payslip.basicSalary,
      bonus: payslip.bonus,
      deductions: payslip.deductions,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payslip?")) {
      try {
        await payrollService.deletePayroll(id);
        await loadPayrolls(); // Reload to ensure sync
      } catch (error) {
        console.error("Failed to delete payslip:", error);
        alert("Failed to delete payslip. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    if (!formData.employeeName || !formData.month) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      console.log("Saving payroll:", formData);
      if (editingPayslip) {
        const result = await payrollService.updatePayroll(editingPayslip.$id, formData);
        console.log("Update result:", result);
      } else {
        const result = await payrollService.createPayroll(formData);
        console.log("Create result:", result);
      }
      
      await loadPayrolls(); // Reload to ensure sync
      setShowModal(false);
    } catch (error) {
      console.error("Failed to save payslip:", error);
      console.error("Error details:", error.message, error.code);
      alert(`Failed to save payslip: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "employeeName" || name === "month" ? value : parseFloat(value) || 0,
    }));
  };

  return (
    <div className="payroll-wrapper">
      <div className="payroll-header">
        <h1 className="payroll-title">Payroll Management</h1>
        <button className="payroll-btn-add" onClick={handleAdd}>
          + Add Payslip
        </button>
      </div>

      <div className="payroll-card">
        <table className="payroll-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Month</th>
              <th>Basic Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((p) => (
              <tr key={p.$id}>
                <td>{p.$id?.substring(0, 8) || 'N/A'}</td>
                <td>{p.employeeName}</td>
                <td>{p.month}</td>
                <td>${p.basicSalary?.toLocaleString() || 0}</td>
                <td>${p.bonus?.toLocaleString() || 0}</td>
                <td>${p.deductions?.toLocaleString() || 0}</td>
                <td className="net">${p.netSalary?.toLocaleString() || 0}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(p)}>
                    ✏️
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(p.$id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingPayslip ? "Edit Payslip" : "Add New Payslip"}</h2>
            
            <div className="form-group">
              <label>Employee Name *</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                placeholder="Enter employee name"
              />
            </div>

            <div className="form-group">
              <label>Month *</label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                placeholder="e.g., Dec 2025"
              />
            </div>

            <div className="form-group">
              <label>Basic Salary</label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Bonus</label>
              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Deductions</label>
              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Net Pay (Calculated)</label>
              <input
                type="text"
                value={`$${calculateNet(formData.basicSalary, formData.bonus, formData.deductions).toLocaleString()}`}
                disabled
              />
            </div>

            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
