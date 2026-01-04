import React from "react";
import "./About.css";

function About() {
  const handleEmailClick = () => {
    const email = "support@medreminder.com"; // Your support email
    const subject = encodeURIComponent("Medicine Reminder Support Request");
    const body = encodeURIComponent("Hi Support Team,\n\nI need help with...");
    
    // This opens the default email client on the user's device
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="about-container">
      {/* Header Section */}
      <section className="about-hero">
        <h1>Your Health, Our Mission</h1>
        <p>Simplifying medication management so you can focus on what matters most—recovery.</p>
      </section>

      {/* Content Section */}
      <div className="about-content">
        <section className="about-section">
          <h2>Why Medicine Reminder?</h2>
          <p>
            Missing a dose can slow down recovery or cause health complications. 
            We built this tool to provide a reliable, easy-to-use interface that 
            empowers patients and caregivers to stay on track with their treatment plans.
          </p>
        </section>

        <section className="mission-grid">
          <div className="mission-item">
            <div className="icon">🛡️</div>
            <h3>Reliability</h3>
            <p>Persistent alarms ensure you never overlook a scheduled dose.</p>
          </div>
          <div className="mission-item">
            <div className="icon">✨</div>
            <h3>Simplicity</h3>
            <p>A clean, distraction-free interface designed for users of all ages.</p>
          </div>
          <div className="mission-item">
            <div className="icon">🔒</div>
            <h3>Privacy</h3>
            <p>Your data is stored locally on your device, giving you full control over your health information.</p>
          </div>
        </section>

      </div>

      <footer className="about-footer">
        <hr className="footer-line" />
        <p>© 2025 Medicine Reminder App. Version 1.0.0</p>
      </footer>
    </div>
  );
}

export default About;
