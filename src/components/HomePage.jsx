import React, { useState } from "react";
import "./homepage.css";
import { authService } from "../appwrite";

const HomePage = ({ bgImage, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Attempt to login with Appwrite
      await authService.login({ email, password });
      onLogin();
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* LEFT IMAGE */}
        <div className="left-side">
          <img src={bgImage} alt="Pink background" />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="right-side">
          <h1 className="title">Bareera Int.</h1>

          {error && <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{error}</div>}

          <label>Email</label>
          <div className="input-box">
            <span className="icon">👤</span>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <label>Password</label>
          <div className="input-box">
            <span className="icon">🔒</span>
            <input 
              type="password" 
              placeholder="Enter your Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
              disabled={loading}
            />
          </div>

          <div className="btn-row">
            <button className="reset-btn" onClick={handleReset} disabled={loading}>
              Reset
            </button>
            <button className="login-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
