import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./OfficerLayout.css";

const OfficerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/officer-dashboard" },
    { name: "Loan Review", path: "/review" },
    { name: "Reports", path: "/reports" },
  ];

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage, or remove specific items
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="officer-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Loan Officer Panel</h2>
        <nav className="sidebar-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default OfficerLayout;
