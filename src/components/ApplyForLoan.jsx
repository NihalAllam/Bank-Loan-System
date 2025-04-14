import React, { useState } from "react";
import "./ApplyLoanPage.css";

export default function ApplyLoanPage() {
  const [formData, setFormData] = useState({
    amount: "",
    tenure: "",
    purpose: "",
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documents") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append("amount", formData.amount);
    form.append("tenure", formData.tenure);
    form.append("purpose", formData.purpose);
  
    // Append each uploaded document
    for (let i = 0; i < formData.documents.length; i++) {
      form.append("documents", formData.documents[i]);
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/loans/apply", {
        method: "POST",
        body: form,
      });
  
      if (res.ok) {
        alert("Loan application submitted!");
        setFormData({
          amount: "",
          tenure: "",
          purpose: "",
          documents: null,
        });
      } else {
        alert("Failed to submit loan application.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error while submitting loan application.");
    }
  };
  

  return (
    <div className="apply-loan-container">
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit} className="loan-form">
        <label>
          Loan Amount (₹)
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tenure (in months)
          <input
            type="number"
            name="tenure"
            value={formData.tenure}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Purpose of Loan
          <textarea
            name="purpose"
            rows="3"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="e.g., Home Renovation, Medical, Education"
            required
          />
        </label>

        <label>
          Upload Required Documents
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
    </div>
  );
}
