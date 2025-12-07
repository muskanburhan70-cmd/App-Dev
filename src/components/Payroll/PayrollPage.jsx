import React, { useState } from "react";
import "./PayrollPage.css";

export default function PayrollPage() {
  const [payslips, setPayslips] = useState([
    { id: "P001", name: "Maria", month: "Nov 2025", basicSalary: 2000, bonus: 500, deductions: 0, net: 2500 },
    { id: "P002", name: "Ali Khan", month: "Nov 2025", basicSalary: 1700, bonus: 200, deductions: 0, net: 1900 },
    { id: "P003", name: "Maryam", month: "Nov 2025", basicSalary: 2000, bonus: 200, deductions: 0, net: 2200 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPayslip, setEditingPayslip] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    month: "",
    basicSalary: 0,
    bonus: 0,
    deductions: 0,
  });

  const calculateNet = (basic, bonus, deductions) => {
    return parseFloat(basic) + parseFloat(bonus) - parseFloat(deductions);
  };

  const handleAdd = () => {
    setEditingPayslip(null);
    setFormData({
      id: `P${String(payslips.length + 1).padStart(3, "0")}`,
      name: "",
      month: "",
      basicSalary: 0,
      bonus: 0,
      deductions: 0,
    });
    setShowModal(true);
  };

  const handleEdit = (payslip) => {
    setEditingPayslip(payslip.id);
    setFormData({
      id: payslip.id,
      name: payslip.name,
      month: payslip.month,
      basicSalary: payslip.basicSalary,
      bonus: payslip.bonus,
      deductions: payslip.deductions,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this payslip?")) {
      setPayslips(payslips.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    const net = calculateNet(formData.basicSalary, formData.bonus, formData.deductions);
    
    if (!formData.name || !formData.month) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingPayslip) {
      setPayslips(
        payslips.map((p) =>
          p.id === editingPayslip
            ? { ...formData, net }
            : p
        )
      );
    } else {
      setPayslips([...payslips, { ...formData, net }]);
    }
    
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "name" || name === "month" ? value : parseFloat(value) || 0,
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
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.month}</td>
                <td>${p.basicSalary.toLocaleString()}</td>
                <td>${p.bonus.toLocaleString()}</td>
                <td>${p.deductions.toLocaleString()}</td>
                <td className="net">${p.net.toLocaleString()}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(p)}>
                    ✏️
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(p.id)}>
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
                name="name"
                value={formData.name}
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
