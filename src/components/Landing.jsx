import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import "./landing.css"

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Fast & Secure <span className="highlight">Bank Loans</span>
        </motion.h1>
        <p>Get your loan approved in minutes with our hassle-free process.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="apply-button"
        >
          Apply Now
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <FaCheckCircle className="feature-icon" />
          <h3>Instant Approval</h3>
          <p>Get loans approved within minutes with our AI-powered system.</p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <FaCheckCircle className="feature-icon" />
          <h3>Flexible EMI</h3>
          <p>Choose your repayment plan according to your convenience.</p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <FaCheckCircle className="feature-icon" />
          <h3>Secure Transactions</h3>
          <p>All transactions are encrypted and comply with banking standards.</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Bank Loan System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
