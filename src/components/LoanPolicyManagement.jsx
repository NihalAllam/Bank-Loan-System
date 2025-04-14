import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoanPolicyManagement.css";

const LoanPolicyManagement = () => {
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState({
    purpose: "",
    interestRate: "",
    minLimit: "",
    maxLimit: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchPolicies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/policies");
      setPolicies(res.data);
    } catch (err) {
      console.error("Failed to fetch policies", err);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/policies/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/policies", formData);
      }
      setFormData({ purpose: "", interestRate: "", minLimit: "", maxLimit: "" });
      setEditId(null);
      fetchPolicies();
    } catch (err) {
      console.error("Error saving policy", err);
    }
  };

  const handleEdit = (policy) => {
    setFormData({
      purpose: policy.purpose,
      interestRate: policy.interestRate,
      minLimit: policy.minLimit,
      maxLimit: policy.maxLimit,
    });
    setEditId(policy._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/policies/${id}`);
      fetchPolicies();
    } catch (err) {
      console.error("Error deleting policy", err);
    }
  };

  return (
    <div className="policy-container">
      <h1 className="page-title">Loan Policy Management</h1>

      <div className="form-section">
        <label>Loan Purpose</label>
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        />

        <label>Interest Rate (%)</label>
        <input
          type="number"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
        />

        <label>Minimum Loan Amount (₹)</label>
        <input
          type="number"
          name="minLimit"
          value={formData.minLimit}
          onChange={handleChange}
        />

        <label>Maximum Loan Amount (₹)</label>
        <input
          type="number"
          name="maxLimit"
          value={formData.maxLimit}
          onChange={handleChange}
        />

        <button className="save-btn" onClick={handleSubmit}>
          {editId ? "Update Policy" : "Add Policy"}
        </button>
      </div>

      <div className="policy-list">
        <h2>Loan Policies</h2>
        <table className="policy-table">
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Interest Rate (%)</th>
              <th>Min Limit</th>
              <th>Max Limit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy._id}>
                <td>{policy.purpose}</td>
                <td>{policy.interestRate}</td>
                <td>{policy.minLimit}</td>
                <td>{policy.maxLimit}</td>
                <td>
                  <button onClick={() => handleEdit(policy)}>Edit</button>
                  <button onClick={() => handleDelete(policy._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanPolicyManagement;
