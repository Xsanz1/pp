import React, { useState } from "react";
import "./LoginForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <p>Please enter your email and password</p>

        <div className="input-group">
          <label>Username</label>
          <input type="text" placeholder="user12345678" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="forgot">
          <a href="#">Forgot Password ?</a>
        </div>

        <button className="btn">Sign In</button>
      </div>
    </div>
  );
};

export default LoginForm;
