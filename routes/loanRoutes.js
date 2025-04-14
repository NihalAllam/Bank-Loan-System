const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const LoanApplication = require("../models/Loan");

// Loan Application Submission Route
router.post("/apply", upload.array("documents"), async (req, res) => {
  try {
    const { amount, tenure, purpose } = req.body;
    const documentFiles = req.files.map((file) => file.filename);

    const application = new LoanApplication({
      amount,
      tenure,
      purpose,
      documents: documentFiles,
    });

    await application.save();
    res.status(201).json({ message: "Loan application submitted successfully" });
  } catch (error) {
    console.error("Loan application error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/count", async (req, res) => {
  try {
    const totalLoans = await LoanApplication.countDocuments();
    const approvedLoans = await LoanApplication.countDocuments({ status: "Approved" });
    const pendingLoans = await LoanApplication.countDocuments({ status: "Pending" });

    res.json({ totalLoans, approvedLoans, pendingLoans });
  } catch (err) {
    res.status(500).json({ message: "Error fetching loan stats" });
  }
});

// Get all loan applications
router.get("/all", async (req, res) => {
    try {
      const applications = await LoanApplication.find().sort({ submittedAt: -1 });
      res.status(200).json(applications);
    } catch (error) {
      console.error("Fetch loan details error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/all", async (req, res) => {
    try {
      const loans = await Loan.find().populate("user", "name email");
      res.json(loans);
    } catch (err) {
      console.error("Error fetching all loans:", err);
      res.status(500).json({ error: "Failed to fetch loans" });
    }
  });

  // Update loan status by ID (approve/reject)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedLoan);
  } catch (err) {
    console.error("Error updating loan status:", err);
    res.status(500).json({ error: "Failed to update loan status" });
  }
});

// GET loan by ID
router.get("/:id", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate("customerId", "name email");
    if (!loan) return res.status(404).json({ error: "Loan not found" });

    res.json({
      ...loan._doc,
      user: loan.customerId,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update loan status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Loan.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Loan not found" });

    res.json({ message: "Status updated", loan: updated });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


  

module.exports = router;


