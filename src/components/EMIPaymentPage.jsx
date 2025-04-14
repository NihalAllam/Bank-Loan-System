import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EMIPaymentPage.css";

const EMIPaymentPage = () => {
  const [upcomingEMIs, setUpcomingEMIs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEMIs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/emis/");
        setUpcomingEMIs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching EMIs:", err);
        setLoading(false);
      }
    };

    fetchEMIs();
  }, []);

  const handlePayment = (emiId) => {
    alert(`Redirecting to payment gateway for EMI ID: ${emiId}`);
    // Call payment API here (or update status)
  };

  return (
    <div className="emi-payment-container">
      <h2 className="page-title">Upcoming EMI Payments</h2>

      {loading ? (
        <p>Loading EMI details...</p>
      ) : (
        <div className="emi-table">
          <div className="emi-header">
            <span>EMI ID</span>
            <span>Loan ID</span>
            <span>Due Date</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {upcomingEMIs.map((emi) => (
            <div className="emi-row" key={emi._id}>
              <span>{emi._id.slice(-6).toUpperCase()}</span>
              <span>{emi.loanId?._id?.slice(-6).toUpperCase()}</span>
              <span>{new Date(emi.dueDate).toLocaleDateString()}</span>
              <span>₹{emi.amount.toLocaleString()}</span>
              <span className={`status ${emi.status.toLowerCase()}`}>
                {emi.status}
              </span>
              <span>
                {emi.status === "Pending" ? (
                  <button className="pay-btn" onClick={() => handlePayment(emi._id)}>
                    Pay Now
                  </button>
                ) : (
                  <span className="paid-label">✔ Paid</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EMIPaymentPage;
