import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddMedicine.css";

function AddMedicine() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    type: "Pill",
    frequency: "Daily",
    time: "",
    startDate: "",
    endDate: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FIX: Synced URL to 'medications' to match Reminders page and Backend
      const response = await fetch("http://localhost:5000/api/medications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Medicine Reminder Saved to Database!");
        navigate("/reminders");
      } else {
        const errorData = await response.json();
        alert("Error: " + (errorData.message || "Failed to save medicine"));
      }
    } catch (err) {
      console.error("Connection error:", err);
      alert("Could not connect to the backend server. Make sure it is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-med-container">
      <div className="form-card">
        <header className="form-header">
          <h2>Add New Medicine</h2>
          <p>Fill in the details to set your reminder.</p>
        </header>

        <form onSubmit={handleSubmit} className="medicine-form">
          <div className="input-group">
            <label>Medicine Name</label>
            <input 
              type="text" name="name" placeholder="e.g., Amoxicillin" 
              required onChange={handleChange} 
            />
          </div>

          <div className="input-group">
            <label>Medication Type</label>
            <div className="type-selector">
              {['Pill', 'Syrup', 'Injection', 'Tablet'].map((t) => (
                <label key={t} className={`type-option ${formData.type === t ? 'active' : ''}`}>
                  <input 
                    type="radio" name="type" value={t} 
                    checked={formData.type === t} onChange={handleChange} 
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Dosage</label>
              <input type="text" name="dosage" placeholder="500mg" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Time</label>
              <input type="time" name="time" required onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Start Date</label>
              <input type="date" name="startDate" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>End Date (Optional)</label>
              <input type="date" name="endDate" onChange={handleChange} />
            </div>
          </div>

          <div className="input-group">
            <label>Frequency</label>
            <select name="frequency" onChange={handleChange}>
              <option value="Daily">Once Daily</option>
              <option value="Twice Daily">Twice Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="As Needed">As Needed (SOS)</option>
            </select>
          </div>

          <div className="input-group">
            <label>Instructions / Notes</label>
            <textarea name="notes" placeholder="e.g., Take after food..." rows="3" onChange={handleChange}></textarea>
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)} disabled={loading}>Cancel</button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMedicine;