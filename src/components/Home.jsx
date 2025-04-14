import { FaLock, FaCalculator, FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Home.css';

export default function HomePage() {
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");
  const goToHome = () => navigate("/");

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="logo" onClick={goToHome} style={{ cursor: 'pointer' }}>Phoenix Bank</h1>
        <div className="nav-buttons">
          <button className="nav-btn" onClick={goToLogin}>Login</button>
          <button className="nav-btn" onClick={goToLogin}>Apply for Loan</button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="hero-section">
        <h2>Your Trusted Loan Partner</h2>
        <p>Apply for a hassle-free loan with easy tracking and quick approval.</p>
        <button className="hero-btn" onClick={goToLogin}>Get Started</button>
      </header>

      <hr />

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <FaCalculator size={40} className="feature-icon blue-icon" />
          <h3>Calculate EMI</h3>
          <p>Plan your loan repayments easily.</p>
        </div>
        
        <div className="feature-card">
          <FaMoneyCheckAlt size={40} className="feature-icon green-icon" />
          <h3>Loan Application</h3>
          <p>Quick online application with fast approvals.</p>
        </div>
        
        <div className="feature-card">
          <FaLock size={40} className="feature-icon red-icon" />
          <h3>Secure & Compliant</h3>
          <p>Your data is safe with industry-standard encryption.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Bank Loan System. All rights reserved.</p>
      </footer>
    </div>
  );
}
