import React from "react";
import "./Performance/performance.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
