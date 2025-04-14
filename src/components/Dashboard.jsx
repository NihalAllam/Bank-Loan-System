import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";
import axios from "axios";

const CustomerDashboard = () => {
  const [userName, setUserName] = useState("User");
  const [loans, setLoans] = useState([]);
  const [upcomingEMI, setUpcomingEMI] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id;
  
        const loanRes = await axios.get(`/api/loans/user/${userId}`);
        const emiRes = await axios.get(`/api/emis/upcoming/${userId}`);
        const notifRes = await axios.get(`/api/notifications/${userId}`);
  
        setUserName(storedUser?.name || "User");
        setLoans(Array.isArray(loanRes.data) ? loanRes.data : []);
        setUpcomingEMI(emiRes.data);
        setNotifications(Array.isArray(notifRes.data) ? notifRes.data : []);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome back, {userName}!</h2>

      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Total Loans</h3>
          <p>{Array.isArray(loans) ? loans.length : 0}</p>
        </div>
        <div className="widget">
          <h3>EMIs Paid</h3>
          <p>
            {Array.isArray(loans)
              ? loans.reduce((sum, loan) => sum + (loan.emisPaid || 0), 0)
              : 0}
          </p>
        </div>
        <div className="widget">
          <h3>Outstanding Amount</h3>
          <p>
            ₹
            {Array.isArray(loans)
              ? loans
                  .reduce((sum, loan) => sum + (loan.outstandingAmount || 0), 0)
                  .toLocaleString()
              : "0"}
          </p>
        </div>
      </div>

      <div className="section">
        <h3>Recent Loan Applications</h3>
        <div className="loan-list">
          {Array.isArray(loans) && loans.slice(0, 3).map((loan) => (
            <div className="loan-card" key={loan._id}>
              <p><strong>Loan ID:</strong> {loan.loanId}</p>
              <p><strong>Amount:</strong> ₹{loan.amount?.toLocaleString()}</p>
              <p><strong>Status:</strong> {loan.status}</p>
            </div>
          ))}
        </div>
        <button className="view-all-btn" onClick={() => navigate("/loan-details")}>View All Loans</button>
      </div>

      <div className="section">
        <h3>Upcoming EMI</h3>
        {upcomingEMI ? (
          <div className="emi-info">
            <p><strong>EMI ID:</strong> {upcomingEMI.emiId}</p>
            <p><strong>Loan ID:</strong> {upcomingEMI.loanId}</p>
            <p><strong>Amount:</strong> ₹{upcomingEMI.amount}</p>
            <p><strong>Due Date:</strong> {upcomingEMI.dueDate}</p>
            <button className="pay-now-btn" onClick={() => navigate("/emi-payment")}>Pay Now</button>
          </div>
        ) : (
          <p>No upcoming EMI.</p>
        )}
      </div>

      <div className="section">
        <h3>Notifications</h3>
        <ul className="notifications">
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((note, index) => <li key={index}>{note.message}</li>)
          ) : (
            <li>No new notifications.</li>
          )}
        </ul>
      </div>

      <div className="quick-actions">
        <button onClick={() => navigate("/transactions")}>Transaction History</button>
        <button onClick={() => navigate("/emi-payment")}>Pay EMI</button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
