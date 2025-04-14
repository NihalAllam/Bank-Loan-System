const express = require('express');
const User = require('../models/User');
const Loan = require('../models/Loan');
const EMI = require('../models/EMI');
const router = express.Router();

// Route to get all users (excluding admins and loan officers)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin', $ne: 'LoanOfficer' } });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get loan statistics (total loans, approved, and pending)
router.get('/loans/count', async (req, res) => {
  try {
    const totalLoans = await Loan.countDocuments();
    const approvedLoans = await Loan.countDocuments({ status: 'Approved' });
    const pendingLoans = await Loan.countDocuments({ status: 'Pending' });
    res.json({ totalLoans, approvedLoans, pendingLoans });
  } catch (err) {
    console.error('Error fetching loan stats:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all EMI records
router.get('/emis', async (req, res) => {
  try {
    const emis = await EMI.find().populate('loanId');
    res.json(emis);
  } catch (err) {
    console.error('Error fetching EMI records:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
