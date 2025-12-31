import React, { useState, useEffect } from "react";
import "./EmployeePage.css";
import { employeeService } from "../../appwrite";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    status: "Active",
    email: "",
    phone: "",
    joinDate: "",
  });

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to load employees:", error);
      alert("Failed to load employees. Please try again.");
    }
  };

  // Load employees from Appwrite on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      await loadEmployees();
    };
    fetchEmployees();
  }, []);

  // Compute stats directly from employees to avoid unnecessary state and effects
  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === "Active").length,
    inactive: employees.filter((e) => e.status === "Inactive").length,
  };

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = searchTerm === "" || 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === "" || emp.department === filterDepartment;
    const matchesStatus = filterStatus === "" || emp.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAdd = () => {
    setEditingEmployee(null);
    setFormData({
      name: "",
      department: "",
      status: "Active",
      email: "",
      phone: "",
      joinDate: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      department: emp.department,
      status: emp.status,
      email: emp.email,
      phone: emp.phone,
      joinDate: emp.joinDate,
    });
    setShowModal(true);
  };

  const handleDelete = async (uid) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        // Find employee by uid to get the document $id
        const employee = employees.find((emp) => emp.uid === uid);
        if (employee && employee.$id) {
          await employeeService.deleteEmployee(employee.$id);
          await loadEmployees(); // Reload to ensure sync
        }
      } catch (error) {
        console.error("Failed to delete employee:", error);
        alert("Failed to delete employee. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.department || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      if (editingEmployee) {
        // Update existing employee
        await employeeService.updateEmployee(editingEmployee.$id, formData);
      } else {
        // Add new employee - generate uid
        const nextNum = employees.length ? Math.max(...employees.map((e) => {
          const match = e.uid?.match(/\d+$/);
          return match ? Number(match[0]) : 0;
        })) + 1 : 1;
        const uid = `EMP-${String(nextNum).padStart(3, "0")}`;
        await employeeService.createEmployee({ ...formData, uid });
      }

      await loadEmployees(); // Reload to ensure sync
      setShowModal(false);
    } catch (error) {
      console.error("Failed to save employee:", error);
      alert("Failed to save employee. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterDepartment("");
    setFilterStatus("");
  };

  const departments = [...new Set(employees.map((e) => e.department))];

  return (
    <div className="employee-page">
      <div className="employee-header">
        <div>
          <h1 className="employee-title">Employee Management</h1>
          <div className="stats-bar">
            <span className="stat-item">Total: <strong>{stats.total}</strong></span>
            <span className="stat-item active">Active: <strong>{stats.active}</strong></span>
            <span className="stat-item inactive">Inactive: <strong>{stats.inactive}</strong></span>
          </div>
        </div>
        <button className="add-btn" type="button" onClick={handleAdd}>
          + Add Employee
        </button>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="🔍 Search by name, email, or ID..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {(searchTerm || filterDepartment || filterStatus) && (
          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      <div className="employee-card">
        <div className="table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Actions</th>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.uid} className="table-row">
                    <td className="actions-cell">
                      <button
                        className="icon-button edit-btn"
                        onClick={() => handleEdit(emp)}
                        aria-label={`Edit ${emp.name}`}
                      >
                        ✏️
                      </button>
                      <button
                        className="icon-button delete-btn"
                        onClick={() => handleDelete(emp.uid)}
                        aria-label={`Delete ${emp.name}`}
                      >
                        🗑
                      </button>
                    </td>
                    <td>{emp.uid}</td>
                    <td className="employee-name">{emp.name}</td>
                    <td>{emp.department}</td>
                    <td className="employee-email">{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{new Date(emp.joinDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${emp.status.toLowerCase()}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
            <div className="form-group">
              <label>Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
              />
            </div>
            <div className="form-group">
              <label>Join Date</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>
                {editingEmployee ? "Update" : "Add"} Employee
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

export default EmployeePage;

