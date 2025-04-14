import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoanOfficerDashboard.css";

export default function LoanOfficerDashboard() {
  const [loans, setLoans] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get("/api/loans/all");
        console.log("Fetched Loans:", res.data); // ✅ Check if it's an array
        setLoans(res.data);
      } catch (err) {
        console.error("Error fetching loans:", err);
        setLoans([]); // fallback to empty array on error
      }
    };
    
  }, []);

  const filteredLoans =
    statusFilter === "All"
      ? loans
      : loans.filter((loan) => loan.status === statusFilter);

  return (
    <div className="loan-list">
  {Array.isArray(filteredLoans) && filteredLoans.length > 0 ? (
    filteredLoans.map((loan) => (
      <div key={loan._id} className="loan-card">
        <h4>{loan.applicantName || loan.user?.name || "Unnamed Applicant"}</h4>
        <p>Loan Amount: ₹{loan.amount?.toLocaleString()}</p>
        <p>Status: <strong>{loan.status}</strong></p>
      </div>
    ))
  ) : (
    <p>No loan applications found.</p>
  )}
</div>

  );
}
