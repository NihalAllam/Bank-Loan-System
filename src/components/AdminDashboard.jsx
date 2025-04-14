import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loanOfficers, setLoanOfficers] = useState(0);
  const [loanStats, setLoanStats] = useState({
    totalLoans: 0,
    approvedLoans: 0,
    pendingLoans: 0,
  });
  const [emis, setEmis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, loanStatsRes, emisRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/api/admin/loans/count"),
          axios.get("http://localhost:5000/api/emis"),
        ]);

        // Filter out users by role to separate customers and loan officers
        const allUsers = usersRes.data;
        const customers = allUsers.filter(user => user.role !== "admin" && user.role !== "LoanOfficer");
        const loanOfficersCount = allUsers.filter(user => user.role === "LoanOfficer").length;


        setUsers(customers);  // Set customers
        setLoanOfficers(loanOfficersCount);  // Set number of loan officers
        setLoanStats(loanStatsRes.data);
        setEmis(emisRes.data);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1 className="page-title">Admin Dashboard</h1>

      {/* Summary Cards */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>Total Loans</h3>
          <p>{loanStats.totalLoans}</p>
        </div>
        <div className="stat-card">
          <h3>Approved Loans</h3>
          <p>{loanStats.approvedLoans}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Applications</h3>
          <p>{loanStats.pendingLoans+1}</p>
        </div>
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Loan Officers</h3>
          <p>{loanOfficers}</p>
        </div>
      </section>

      {/* User List */}
      <section className="user-management">
        <h2>User Management</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="5">No users found.</td></tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user._id.slice(-6).toUpperCase()}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>Active</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* EMI Section */}
      <section className="emi-section">
        <h2>EMI Details</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>EMI ID</th>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Paid Date</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {emis.length === 0 ? (
              <tr><td colSpan="7">No EMI records.</td></tr>
            ) : (
              emis.map(emi => (
                <tr key={emi._id}>
                  <td>{emi._id.slice(-6).toUpperCase()}</td>
                  <td>{emi.loanId?._id.slice(-6).toUpperCase()}</td>
                  <td>{emi.amount}</td>
                  <td>{new Date(emi.dueDate).toLocaleDateString()}</td>
                  <td>{emi.status}</td>
                  <td>{emi.paidDate ? new Date(emi.paidDate).toLocaleDateString() : "—"}</td>
                  <td>{emi.mode || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
