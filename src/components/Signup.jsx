import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    kycDocument: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, kycDocument: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("kycDocument", formData.kycDocument);

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-container signup-mode">
      <div className="left-section">
        <img src="/Phoenix.png" alt="Phoenix Bank Logo" className="bank-logo" />
      </div>

      <div className="right-section">
        <div className="login-signup-box">
          <div className="form-container slide-left">
            <div className="form signup-form">
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label className="file-label">
                  Upload KYC Document:
                  <input
                    type="file"
                    name="kycDocument"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFileChange}
                    required
                  />
                </label>
                <button type="submit" className="auth-button">Sign Up</button>
              </form>
              <p>
                Already have an account?{" "}
                <span className="toggle-link" onClick={() => navigate("/login")}>
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
