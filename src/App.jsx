import React, { useState, useEffect } from "react";
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
import { authService } from "./appwrite";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const loggedIn = await authService.isLoggedIn();
      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

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