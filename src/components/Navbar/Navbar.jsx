import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const createRipple = (e) => {
    const el = e.currentTarget;
    // ensure position context
    if (getComputedStyle(el).position === "static") {
      el.style.position = "relative";
    }
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size * 2}px`;
    // position at click point; CSS will center via translate(-50%,-50%)
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    el.appendChild(ripple);

    // remove after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        Bareera Int.
      </div>

      <ul className="nav-links">
        <li onMouseDown={createRipple}>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
            Dashboard
          </Link>
        </li>
        <li onMouseDown={createRipple}>
          <Link to="/employee" style={{ textDecoration: "none", color: "inherit" }}>
            Employee
          </Link>
        </li>
        <li onMouseDown={createRipple}>
          <Link to="/attendance" style={{ textDecoration: "none", color: "inherit" }}>
            Attendance
          </Link>
        </li>
        <li onMouseDown={createRipple}>
          <Link to="/payroll" style={{ textDecoration: "none", color: "inherit" }}>
            Payroll
          </Link>
        </li>
        <li onMouseDown={createRipple}>
          <Link to="/performance" style={{ textDecoration: "none", color: "inherit" }}>
            Performance
          </Link>
        </li>
        <li onMouseDown={createRipple}>
          <Link to="/employee-portal" style={{ textDecoration: "none", color: "inherit" }}>
            Employee Portal
          </Link>
        </li>
        {onLogout && (
          <li>
            <button
              onMouseDown={createRipple}
              onClick={onLogout}
              className="nav-logout-btn"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
