// CustomerLayout.jsx
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./CustomerLayout.css";

const CustomerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Apply for Loan", path: "/apply" },
    { name: "Loan Details", path: "/loan-details" },
    { name: "EMI Payment", path: "/emi-payment" },
    { name: "Transaction History", path: "/transactions" },
  ];

  const handleLogout = () => {
    localStorage.clear(); // or remove specific items if needed
    navigate("/login");
  };

  return (
    <div className="customer-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Customer Panel</h2>
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

export default CustomerLayout;
