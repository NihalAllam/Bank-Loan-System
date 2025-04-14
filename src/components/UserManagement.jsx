import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "",password:"", role: "Customer" });
  const [editId, setEditId] = useState(null);
  const [filterRole, setFilterRole] = useState("All");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data.filter(user => user.role !== "Admin")); // exclude admin
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const updatedFormData = { ...formData };
  
      if (editId) {
        // Don't override role when editing
        await axios.put(`http://localhost:5000/api/users/${editId}`, updatedFormData);
      } else {
        // Force Loan Officer role only for new additions
        updatedFormData.role = "loanOfficer";
        await axios.post("http://localhost:5000/api/users", updatedFormData);
      }
  
      setFormData({ name: "", email: "", password: "", role: "Customer" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user", err);
    }
  };
  
  

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, password: "", role: user.role });
    setEditId(user._id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${pendingDeleteId}`);
      setPendingDeleteId(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filterRole === "All") return true;
    return user.role === filterRole;
  });

  return (
    <div className="user-management-container">
  <h1>User Management</h1>

  {/* Add Loan Officer Form */}
  <div className="form-section">
    <h2>Add New Loan Officer</h2>
    <input
      type="text"
      name="name"
      placeholder="Full Name"
      value={editId ? "" : formData.name}
      onChange={handleChange}
      disabled={editId}
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={editId ? "" : formData.email}
      onChange={handleChange}
      disabled={editId}
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={editId ? "" : formData.password}
      onChange={handleChange}
      disabled={editId}
    />
    <button
      className="submit-btn"
      onClick={() => {
        if (!editId && window.confirm("Are you sure you want to add this Loan Officer?")) {
          handleSubmit();
        }
      }}
      disabled={editId}
    >
      Add Loan Officer
    </button>
  </div>

  {/* Edit User Form */}
  {editId && (
    <div className="form-section edit-box">
      <h2>Edit User</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="New Password (optional)"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        className="submit-btn"
        onClick={() => {
          if (window.confirm("Are you sure you want to update this user?")) {
            handleSubmit();
          }
        }}
      >
        Update User
      </button>
      <button
        className="cancel-btn"
        onClick={() => {
          setEditId(null);
          setFormData({ name: "", email: "", password: "", role: "Customer" });
        }}
      >
        Cancel Edit
      </button>
    </div>
  )}

  {/* User List */}
  <div className="user-list-section">
    <h2>Users</h2>
    <div className="role-buttons">
      <button className={filterRole === "All" ? "active" : ""} onClick={() => setFilterRole("All")}>
        All Users
      </button>
      <button className={filterRole === "customer" ? "active" : ""} onClick={() => setFilterRole("customer")}>
        Customers
      </button>
      <button className={filterRole === "loanOfficer" ? "active" : ""} onClick={() => setFilterRole("loanOfficer")}>
        Loan Officers
      </button>
    </div>

    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.length === 0 ? (
          <tr><td colSpan="4">No users found.</td></tr>
        ) : (
          filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                {pendingDeleteId === user._id ? (
                  <>
                    <button className="confirm-delete" onClick={confirmDelete}>Confirm</button>
                    <button onClick={() => setPendingDeleteId(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setPendingDeleteId(user._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default UserManagement;
