import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoanDetailsPage.css';

const LoanDetailsPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/loans/all");
        setLoans(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching loan details:", error);
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="loan-details-container">
      <h2 className="page-title">Loan Details</h2>

      {loading ? (
        <p>Loading loan details...</p>
      ) : loans.length === 0 ? (
        <p>No loan applications found.</p>
      ) : (
        <div className="loan-list">
          {loans.map((loan) => (
            <div className="loan-card" key={loan._id}>
              <div className="loan-header">
                <h3>Loan ID: {loan._id.slice(-6).toUpperCase()}</h3>
                <span className={`status-tag ${loan.status.toLowerCase()}`}>
                  {loan.status}
                </span>
              </div>

              <div className="loan-info">
                <p><strong>Amount:</strong> ₹{loan.amount.toLocaleString()}</p>
                <p><strong>Tenure:</strong> {loan.tenure} months</p>
                <p><strong>EMI:</strong> ₹{(loan.amount / loan.tenure).toFixed(2)}</p>
                <p><strong>Total Repayment:</strong> ₹{(loan.amount).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanDetailsPage;
