import React from "react";
import "./ReportsPage.css";

const loanTrends = [
  { month: "Jan", approved: 12, rejected: 3 },
  { month: "Feb", approved: 18, rejected: 4 },
  { month: "Mar", approved: 25, rejected: 2 },
  { month: "Apr", approved: 20, rejected: 6 },
];

const defaulters = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    missedEMIs: 2,
    totalDue: 8500,
  },
  {
    name: "Michael Lee",
    email: "michael@example.com",
    missedEMIs: 3,
    totalDue: 12000,
  },
];

export default function ReportsPage() {
  return (
    <div className="reports-container">
      <h2>Reports Dashboard</h2>

      {/* Loan Trends */}
      <div className="loan-trends">
        <h3>Loan Trends (Monthly)</h3>
        <div className="bar-chart">
          {loanTrends.map((item, idx) => (
            <div className="bar-item" key={idx}>
              <div
                className="bar approved"
                style={{ height: `${item.approved * 5}px` }}
                title={`Approved: ${item.approved}`}
              />
              <div
                className="bar rejected"
                style={{ height: `${item.rejected * 5}px` }}
                title={`Rejected: ${item.rejected}`}
              />
              <span>{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Defaulter List */}
      <div className="defaulters">
        <h3>Defaulter List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Missed EMIs</th>
              <th>Total Due (₹)</th>
            </tr>
          </thead>
          <tbody>
            {defaulters.map((d, index) => (
              <tr key={index}>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.missedEMIs}</td>
                <td>{d.totalDue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
