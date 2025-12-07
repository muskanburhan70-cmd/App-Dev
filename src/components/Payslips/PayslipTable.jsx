import React, { useState } from 'react';
import PayslipRow from './PayslipRow';
import './PayslipTable.css';

const PayslipTable = () => {
  const initialEmployees = [
    { uid: '001', name: 'Ayesha', basic: 0, deductions: 0, net: 0 },
    { uid: '002', name: 'Maria', basic: 0, deductions: 0, net: 0 },
    { uid: '003', name: 'Maryam', basic: 0, deductions: 0, net: 0 },
    { uid: '004', name: 'Ali Khan', basic: 0, deductions: 0, net: 0 }
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [totals, setTotals] = useState({ basic: 0, deductions: 0, net: 0 });

  const handleUpdate = (uid, data) => {
    const updatedEmployees = employees.map(emp => 
      emp.uid === uid ? { ...emp, ...data } : emp
    );
    setEmployees(updatedEmployees);
    
    // Calculate totals
    const newTotals = updatedEmployees.reduce((acc, emp) => ({
      basic: acc.basic + emp.basic,
      deductions: acc.deductions + emp.deductions,
      net: acc.net + emp.net
    }), { basic: 0, deductions: 0, net: 0 });
    
    setTotals(newTotals);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "UID,Name,Basic,Deductions,Net\n"
      + employees.map(emp => 
          `${emp.uid},${emp.name},${emp.basic},${emp.deductions},${emp.net}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payslip_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="payslip-table-container">
      <div className="controls">
        <button className="btn btn-primary" onClick={handlePrint}>
          Print Payslips
        </button>
        <button className="btn btn-secondary" onClick={handleExport}>
          Export to CSV
        </button>
      </div>

      <div className="table-responsive">
        <table className="payslip-table">
          <thead>
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>Basic Salary ($)</th>
              <th>Deductions ($)</th>
              <th>Net Salary ($)</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <PayslipRow
                key={employee.uid}
                uid={employee.uid}
                name={employee.name}
                onUpdate={handleUpdate}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="totals-row">
              <td colSpan="2"><strong>Totals</strong></td>
              <td><strong>${totals.basic.toFixed(2)}</strong></td>
              <td><strong>${totals.deductions.toFixed(2)}</strong></td>
              <td><strong>${totals.net.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PayslipTable;