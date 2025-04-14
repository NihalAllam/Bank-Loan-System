const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  kycDocument: String,
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ["customer", "loanOfficer", "admin"], default: "customer" },
}, {
  collection: "user"
});

module.exports = mongoose.model("User", userSchema);
