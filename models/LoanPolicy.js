const mongoose = require("mongoose");

const LoanPolicySchema = new mongoose.Schema({
  purpose: { type: String, required: true, unique: true },
  interestRate: { type: Number, required: true },
  minLimit: { type: Number, required: true },
  maxLimit: { type: Number, required: true },
});

module.exports = mongoose.model("LoanPolicy", LoanPolicySchema);
