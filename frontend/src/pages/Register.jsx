import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import './Register.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');     // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages
  const navigate = useNavigate();             // Hook for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // 2. Send Data to Backend
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Success: Show message and redirect
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate('/'); // Redirect to Login Page (Assuming '/' is login)
        }, 2000);
      } else {
        // 4. Fail: Show error from backend
        setError(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to connect to server.");
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Image */}
      <div className="auth-image-section">
        <div className="image-overlay">
          <h2>Join MediRemind</h2>
          <p>Start your journey to better health management.</p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Medical Registration" 
        />
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-section">
        <div className="form-wrapper">
          <div className="brand-logo">
            💊 Medi<span className="brand-blue">Remind</span>
          </div>
          
          <h3>Create Account</h3>
          <p className="subtitle">Get started with your free account today.</p>

          {/* DISPLAY MESSAGES */}
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="patient@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-btn">Sign Up</button>
          </form>

          <p className="redirect-text">
            Already have an account? <Link to="/">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;