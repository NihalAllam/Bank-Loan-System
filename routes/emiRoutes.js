const express = require("express");
const router = express.Router();
const EMI = require("../models/EMI");

// Get all EMIs (or filter by user/loan if needed)
router.get("/", async (req, res) => {
  try {
    const emis = await EMI.find().populate("loanId");
    res.json(emis);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching EMIs" });
  }
});

// Get completed (Paid) EMIs
router.get("/history", async (req, res) => {
  try {
    const paidEmis = await EMI.find({ status: "Paid" }).populate("loanId");
    res.json(paidEmis);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching transactions" });
  }
});


module.exports = router;
