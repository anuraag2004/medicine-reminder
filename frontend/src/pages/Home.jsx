import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Never Miss a Dose Again</h1>
            <p>Your health, on schedule. Managing your medications has never been this simple and elegant.</p>
            <Link to="/add" className="cta-button">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="icon-circle">✔️</div>
          <h3>Daily Reminders</h3>
          <p>Get notified exactly when it's time to take your pills with persistent alarms.</p>
        </div>

        <div className="feature-card">
          <div className="icon-circle">📅</div>
          <h3>Medication Schedule</h3>
          <p>View your entire week at a glance and track your adherence history.</p>
        </div>

        <div className="feature-card">
          <div className="icon-circle">❤️</div>
          <h3>Stay Healthy</h3>
          <p>Focus on recovery while we handle the timing and organization for you.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;