import React, { useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage";
import EmployeePage from "./components/Employee/EmployeePage";
import AttendancePage from "./Pages/AttendancePage";
import PayrollPage from "./components/Payroll/PayrollPage";
import PerformancePage from "./components/Performance/PerformancePage";
import EmployeePortal from "./components/EmployeePortal/EmployeePortal";
import bgImage from "./assets/your-image.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <HomePage bgImage={bgImage} onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/employee"
          element={
            isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} />
                <EmployeePage />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/attendance"
          element={
            isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} />
                <AttendancePage />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/payroll"
          element={
            isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} />
                <PayrollPage />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/performance"
          element={
            isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} />
                <PerformancePage />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/employee-portal"
          element={
            isLoggedIn ? (
              <>
                <Navbar onLogout={handleLogout} />
                <EmployeePortal />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// import EmployeePortal from "./pages/EmployeePortal";

// function App() {
//   return <EmployeePortal />;
// }

// export default App;