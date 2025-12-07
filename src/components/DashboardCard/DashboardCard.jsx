import React from "react";
import "./DashboardCard.css";

function DashboardCard({ icon, title, value, onClick, trend, alert }) {
  return (
    <div 
      className={`card ${onClick ? 'clickable' : ''} ${alert ? 'alert-card' : ''}`}
      onClick={onClick}
      role={onClick ? "button" : ""}
      tabIndex={onClick ? 0 : -1}
    >
      <div className="card-icon">{icon}</div>
      <h4 className="card-title">{title}</h4>
      <p className="card-value">{value}</p>
      {trend && <span className="card-trend">{trend}</span>}
      {alert && <span className="alert-badge">!</span>}
    </div>
  );
}

export default DashboardCard;
