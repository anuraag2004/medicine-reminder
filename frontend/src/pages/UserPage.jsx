import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [medicines, setMedicines] = useState([]); // 1. State to store medicines
  const navigate = useNavigate();

  // 2. Fetch User Info & Medicines on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/');
    } else {
      try {
        setUser(JSON.parse(storedUser));
        fetchMedicines(); // Call the function to get data
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate('/');
      }
    }
  }, [navigate]);

  // 3. Function to get medicines from Backend
  const fetchMedicines = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/medications");
      if (response.ok) {
        const data = await response.json();
        // Optional: Filter to show only today's medicines or active ones
        setMedicines(data); 
      }
    } catch (err) {
      console.error("Failed to load medicines:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-brand">
          💊 Medicine<span className="brand-blue">Reminder</span>
        </div>
        <div className="nav-menu">
            <span className="welcome-text">Hello, <b>{user.name}</b></span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        
        {/* Profile Section */}
        <div className="profile-card">
            <div className="profile-header">
                <div className="avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <h2>{user.name}</h2>
                <p className="role-badge">Patient Account</p>
            </div>
            
            <div className="profile-body">
                <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{user.email}</span>
                </div>
                <div className="info-row">
                    <span className="label">Total Reminders:</span>
                    <span className="value code">{medicines.length}</span>
                </div>
                <div className="info-row">
                    <span className="label">Status:</span>
                    <span className="status-active">Active</span>
                </div>
            </div>
        </div>

        {/* Widgets Section */}
        <div className="widgets-area">
            <div className="widget">
                <div className="widget-header">
                  <h3>📅 Your Schedule</h3>
                  <Link to="/Add" className="add-mini-btn">+ Add New</Link>
                </div>

                {/* 4. Conditional Rendering: Show List or Empty State */}
                {medicines.length === 0 ? (
                  <div className="empty-state">
                    <p>No medicines scheduled.</p>
                    <Link to="/Add" className="add-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
                        Start Tracking
                    </Link>
                  </div>
                ) : (
                  <div className="schedule-list">
                    {medicines.map((med) => (
                      <div key={med._id} className="schedule-item">
                        <div className="time-box">
                          {med.time}
                        </div>
                        <div className="med-details">
                          <strong>{med.name}</strong>
                          <span>{med.dosage} • {med.frequency}</span>
                        </div>
                        <div className="med-type">
                           {/* Simple icon logic */}
                           {med.type === 'Pill' ? '💊' : med.type === 'Syrup' ? '🧪' : '💉'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default UserPage;