import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LoanReviewPage.css";

export default function LoanReviewPage() {
  const { id } = useParams();
  const [applicantData, setApplicantData] = useState(null);
  const [decision, setDecision] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`/api/loans/${id}`);
        setApplicantData(res.data);
      } catch (err) {
        console.error("Failed to fetch application:", err);
      }
    };

    fetchApplication();
  }, [id]);

  const handleDecision = async (status) => {
    try {
      await axios.put(`/api/loans/${id}/status`, { status });
      setDecision(status);
    } catch (err) {
      console.error("Failed to update decision:", err);
    }
  };

  if (!applicantData) return <p>Loading...</p>;

  return (
    <div className="loan-review-container">
      <h2>Loan Review</h2>

      <div className="applicant-details">
        <h3>Applicant Information</h3>
        <p><strong>Name:</strong> {applicantData.user?.name}</p>
        <p><strong>Email:</strong> {applicantData.user?.email}</p>
        <p><strong>Loan Amount:</strong> ₹{applicantData.amount?.toLocaleString()}</p>
        <p><strong>Tenure:</strong> {applicantData.tenure} months</p>
        <p><strong>Purpose:</strong> {applicantData.purpose}</p>

        <h3>Credit & KYC</h3>
        <p><strong>Credit Score:</strong> {applicantData.creditScore || "N/A"}</p>
        <p><strong>KYC Status:</strong> {applicantData.kycStatus || "Pending"}</p>

        <h3>Uploaded Documents</h3>
        <ul>
          {applicantData.documents?.map((doc, index) => (
            <li key={index}>
              <a href={`/uploads/${doc}`} target="_blank" rel="noreferrer">{doc}</a>
            </li>
          ))}
        </ul>

        <div className="decision-buttons">
          <button className="approve-btn" onClick={() => handleDecision("Approved")}>Approve</button>
          <button className="reject-btn" onClick={() => handleDecision("Rejected")}>Reject</button>
        </div>

        {decision && (
          <p className="decision-msg">
            This loan has been <strong>{decision}</strong>.
          </p>
        )}
      </div>
    </div>
  );
}
