import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignLoanOfficer.css";

const AssignLoanOfficer = () => {
  const [loans, setLoans] = useState([]); // <-- this was previously "customers"
  const [loanOfficers, setLoanOfficers] = useState([]);
  const [selectedLoanId, setSelectedLoanId] = useState("");
  const [selectedOfficer, setSelectedOfficer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loansRes, officersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/loan-applications"),
          axios.get("http://localhost:5000/api/users/loan-officers"),
        ]);        

        console.log("Loans response:", loansRes.data); // 🔍 Check if it's an array
        setLoans(loansRes.data);
        setLoanOfficers(officersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);


  const handleAssign = async (loanId, officerId) => {
    try {
      await axios.put(`/api/admin/assign/${loanId}`, { officerId });
      alert("Loan officer assigned successfully!");
      setLoans((prev) =>
        prev.map((loan) =>
          loan._id === loanId ? { ...loan, assignedOfficer: { _id: officerId } } : loan
        )
      );
    } catch (err) {
      console.error("Error assigning officer:", err);
    }
  };

  return (
    <div>
      <h2>Loan Applications</h2>
      {loans.map((loan) => (
        <div key={loan._id} className="loan-entry">
          <p><strong>Applicant:</strong> {loan.user?.name}</p>
          <p><strong>Amount:</strong> ₹{loan.amount}</p>
          <p><strong>Status:</strong> {loan.status}</p>
          <p><strong>Assigned Officer:</strong> {loan.assignedOfficer?.name || "Not assigned"}</p>
          {loan.status === "Pending" && (
            <div>
              <select
                onChange={(e) => handleAssign(loan._id, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select Officer</option>
                {loanOfficers.map((officer) => (
                  <option key={officer._id} value={officer._id}>
                    {officer.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AssignLoanOfficer;
