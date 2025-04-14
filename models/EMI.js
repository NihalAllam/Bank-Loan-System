const mongoose = require("mongoose");

const emiSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "LoanApplication" },
  amount: Number,
  dueDate: Date,
  status: { type: String, enum: ["Paid","Approved", "Pending"], default: "Pending" },
  paidDate: Date,
  mode: String, // Cash, Online, etc.
});

module.exports = mongoose.model("EmiPayment", emiSchema);
