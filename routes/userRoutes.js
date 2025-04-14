const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');  // <-- Import bcryptjs
const User = require('../models/User');

// Get all non-admin users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }); // Exclude Admin
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);  // Log error
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // Log incoming data for debugging

    const { name, email, password, role } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);  // Log error
    res.status(500).json({ error: "Error creating user" });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    // Update the user with the provided ID
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);  // Log error
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);  // Log error
    res.status(500).json({ error: "Error deleting user" });
  }
});

// Get all loan officers
router.get("/loan-officers", async (req, res) => {
  try {
    const officers = await User.find({ role: "LoanOfficer" });
    res.json(officers);
  } catch (err) {
    console.error("Error fetching loan officers:", err);
    res.status(500).json({ error: "Failed to fetch loan officers" });
  }
});


module.exports = router;
