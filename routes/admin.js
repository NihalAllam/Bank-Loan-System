const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Loan = require('../models/LoanApplication');

// Assign a loan officer to a customer
router.put('/assign-loan-officer/:customerId', async (req, res) => {
  const { officerId } = req.body;

  try {
    const customer = await User.findById(req.params.customerId);
    const officer = await User.findById(officerId);

    // Ensure both customer and officer exist
    if (!customer || !officer) {
      return res.status(400).send('Customer or Officer not found');
    }

    // Create a new loan entry and assign officer
    const loan = await Loan.create({
      userId: customer._id,
      assignedOfficer: officer._id,
      // Add any other necessary loan fields here (e.g., loan amount, etc.)
    });

    res.status(200).json(loan);
  } catch (err) {
    console.error('Error assigning loan officer:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
