import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TransactionHistoryPage.css";

const TransactionHistoryPage = () => {
  const [completedEMIs, setCompletedEMIs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedEMIs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/emis/history");
        setCompletedEMIs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transaction history:", err);
        setLoading(false);
      }
    };

    fetchCompletedEMIs();
  }, []);

  return (
    <div className="transaction-history-container">
      <h2 className="page-title">Transaction History</h2>

      {loading ? (
        <p>Loading transaction history...</p>
      ) : (
        <div className="transaction-table">
          <div className="transaction-header">
            <span>EMI ID</span>
            <span>Loan ID</span>
            <span>Paid Date</span>
            <span>Amount</span>
            <span>Payment Mode</span>
          </div>

          {completedEMIs.map((txn) => (
            <div className="transaction-row" key={txn._id}>
              <span>{txn._id.slice(-6).toUpperCase()}</span>
              <span>{txn.loanId?._id?.slice(-6).toUpperCase()}</span>
              <span>{new Date(txn.paidDate).toLocaleDateString()}</span>
              <span>₹{txn.amount.toLocaleString()}</span>
              <span>{txn.mode}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryPage;
