import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      alert("Login successful!");

      // Store token and user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Get user info from response
      const user = res.data.user;

      // Redirect based on email domain
      if (user.email.endsWith("@admin.com")) {
        navigate("/admindashboard");
      } else if (user.email.endsWith("@phoenix.com")) {
        navigate("/loanofficerdashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-container login-mode">
      <div className="left-section">
        <img src="/Phoenix.png" alt="Phoenix Bank Logo" className="bank-logo" />
      </div>

      <div className="right-section">
        <div className="login-signup-box">
          <div className="form-container">
            <div className="form login-form">
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#" className="forgot-password">Forgot Password?</a> <br />
              <button className="auth-button" onClick={handleLogin}>Login</button>
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="toggle-link">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
