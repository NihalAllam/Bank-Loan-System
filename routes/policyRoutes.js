const express = require("express");
const router = express.Router();
const LoanPolicy = require("../models/LoanPolicy");

// Get all policies
router.get("/", async (req, res) => {
  try {
    const policies = await LoanPolicy.find();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

// Create a new policy
router.post("/", async (req, res) => {
  try {
    const newPolicy = new LoanPolicy(req.body);
    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (err) {
    res.status(400).json({ error: "Failed to create policy" });
  }
});

// Update policy
router.put("/:id", async (req, res) => {
  try {
    const updated = await LoanPolicy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update policy" });
  }
});

// Delete policy
router.delete("/:id", async (req, res) => {
  try {
    await LoanPolicy.findByIdAndDelete(req.params.id);
    res.json({ message: "Policy deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete policy" });
  }
});

module.exports = router;
