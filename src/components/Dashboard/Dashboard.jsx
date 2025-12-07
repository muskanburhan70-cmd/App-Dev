import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import DashboardCard from "../DashboardCard/DashboardCard";
import { FaUsers, FaBell, FaClipboardCheck, FaChartBar } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [username] = useState("Admin User");
  const [role] = useState("Administrator");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Dynamic stats that update
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    performanceAlerts: 0,
    reportsCount: 0,
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate stats on mount
  useEffect(() => {
    const animateValue = (start, end, duration, callback) => {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        callback(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 120, 1500, (val) => 
      setStats(prev => ({ ...prev, totalEmployees: val }))
    );
    animateValue(0, 6, 1000, (val) => 
      setStats(prev => ({ ...prev, pendingLeaves: val }))
    );
    animateValue(0, 2, 800, (val) => 
      setStats(prev => ({ ...prev, performanceAlerts: val }))
    );
    animateValue(0, 15, 1200, (val) => 
      setStats(prev => ({ ...prev, reportsCount: val }))
    );
  }, []);

  const handleCardClick = (route) => {
    navigate(route);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="welcome-title">Welcome, {username}!</h1>
          <h2 className="welcome-subtitle">Role: {role}</h2>
        </div>
        <div className="dashboard-clock">
          <div className="clock-time">{formatTime(currentTime)}</div>
          <div className="clock-date">{formatDate(currentTime)}</div>
        </div>
      </div>

      <div className="cards-row">
        <DashboardCard
          icon={<FaUsers size={30} />}
          title="Total Employees"
          value={stats.totalEmployees}
          onClick={() => handleCardClick('/employee')}
          trend="+5%"
        />

        <DashboardCard
          icon={<FaClipboardCheck size={30} />}
          title="Pending Leaves"
          value={stats.pendingLeaves}
          onClick={() => handleCardClick('/employee-portal')}
          alert={stats.pendingLeaves > 5}
        />
      </div>

      <div className="cards-row">
        <DashboardCard
          icon={<FaBell size={30} />}
          title="Performance Alerts"
          value={stats.performanceAlerts}
          onClick={() => handleCardClick('/performance')}
          alert={stats.performanceAlerts > 0}
        />

        <DashboardCard
          icon={<FaChartBar size={30} />}
          title="Reports Generated"
          value={stats.reportsCount}
          onClick={() => handleCardClick('/payroll')}
          trend="+12%"
        />
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => navigate('/employee')}>
            <FaUsers /> Manage Employees
          </button>
          <button className="action-btn" onClick={() => navigate('/attendance')}>
            <FaClipboardCheck /> Mark Attendance
          </button>
          <button className="action-btn" onClick={() => navigate('/payroll')}>
            <FaChartBar /> Process Payroll
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
