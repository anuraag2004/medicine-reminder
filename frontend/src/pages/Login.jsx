import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');   
    setSuccess(''); 

    try {
      // ✅ FIX: Changed 'localhost' to '127.0.0.1' to prevent connection errors
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Success:", data);
        setSuccess("Login successfully! Redirecting...");

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setTimeout(() => {
          navigate('/home'); 
        }, 1500);
        
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err);
      // This helps you see if the server is actually dead or just unreachable
      setError("Failed to connect. Make sure Backend is running on Port 5000.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <div className="image-overlay">
          <h2>Health First</h2>
          <p>Never miss a dose again.</p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Medicine" 
        />
      </div>

      <div className="login-form-section">
        <div className="form-wrapper">
          <div className="brand-logo">
            💊 Medicine<span className="brand-blue">Reminder</span>
          </div>
          
          <h3>Welcome Back</h3>
          <p className="subtitle">Please enter your details to sign in.</p>

          {error && (
            <div className="error-message" style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {success && (
            <div className="success-message" style={{ color: '#2e7d32', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="patient@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="form-actions">
               <div className="remember-me">
                 <input type="checkbox" id="remember" />
                 <label htmlFor="remember">Remember me</label>
               </div>
            </div>

            <button type="submit" className="login-btn">Sign In</button>
          </form>

          <p className="signup-text">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;