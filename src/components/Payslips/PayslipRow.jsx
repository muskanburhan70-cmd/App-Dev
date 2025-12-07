import React, { useState } from 'react';
import './PayslipRow.css';

const PayslipRow = ({ uid, name, onUpdate }) => {
  const [basic, setBasic] = useState('');
  const [deductions, setDeductions] = useState('');

  const calculateNet = () => {
    const basicNum = parseFloat(basic) || 0;
    const deductionsNum = parseFloat(deductions) || 0;
    return (basicNum - deductionsNum).toFixed(2);
  };

  const handleBlur = () => {
    onUpdate(uid, {
      basic: parseFloat(basic) || 0,
      deductions: parseFloat(deductions) || 0,
      net: parseFloat(calculateNet())
    });
  };

  return (
    <tr className="payslip-row">
      <td className="uid-cell">{uid}</td>
      <td className="name-cell">{name}</td>
      <td className="input-cell">
        <input
          type="number"
          value={basic}
          onChange={(e) => setBasic(e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter basic salary"
          min="0"
          step="0.01"
        />
      </td>
      <td className="input-cell">
        <input
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter deductions"
          min="0"
          step="0.01"
        />
      </td>
      <td className="net-cell">${calculateNet()}</td>
    </tr>
  );
};

export default PayslipRow;
