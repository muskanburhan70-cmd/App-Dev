import React from "react";
import "./homepage.css";

const HomePage = ({ bgImage, onLogin }) => {
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

          <label>Username</label>
          <div className="input-box">
            <span className="icon">👤</span>
            <input type="text" placeholder="Enter your username" />
          </div>

          <label>Password</label>
          <div className="input-box">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Enter your Password" />
          </div>

          <div className="btn-row">
            <button className="reset-btn">Reset</button>
            <button className="login-btn" onClick={onLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
