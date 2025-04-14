const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  amount: {
    type: Number,
    required: true
  },
  tenure: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("LoanApplication", loanApplicationSchema);
