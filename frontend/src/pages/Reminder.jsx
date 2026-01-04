import React, { useEffect, useState } from "react";
import "./Reminder.css";

// A simple beep sound embedded directly so it never fails to load
const BEEP_SOUND = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; // Shortened for brevity, works as a placeholder. 
// REAL BEEP URL (Reliable)
const AUDIO_URL = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

function Reminders() {
  const [medicines, setMedicines] = useState([]);
  // Use a reliable audio source
  const [alarm] = useState(new Audio(AUDIO_URL));
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [lastPlayedMinute, setLastPlayedMinute] = useState(null); // Prevents spamming sound in the same minute

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    if (medicines.length > 0) {
      const interval = setInterval(() => {
        checkAlarm();
      }, 5000); // Check every 5 seconds for better accuracy
      return () => clearInterval(interval);
    }
  }, [medicines, soundEnabled, lastPlayedMinute]);

  const fetchMedicines = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/medications");
      if (response.ok) {
        const data = await response.json();
        setMedicines(data);
      }
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
    }
  };

  const checkAlarm = () => {
    const now = new Date();
    
    // ✅ FIX 1: Manual Time Formatting to ensure HH:MM (24-hour format)
    // This avoids issues where "4:00 PM" doesn't match "16:00"
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    console.log(`Checking Time: ${currentTime}`); // Debugging Log

    // If we already played the alarm for this specific minute, stop here.
    if (lastPlayedMinute === currentTime) return;

    medicines.forEach((med) => {
      // console.log(`Comparing with med: ${med.name} at ${med.time}`); // Debugging Log

      if (med.time === currentTime) {
        console.log("✅ MATCH FOUND! Playing Alarm...");
        playAlarm(med.name);
        setLastPlayedMinute(currentTime); // Mark this minute as "played"
      }
    });
  };

  const playAlarm = (medName) => {
    if (!soundEnabled) {
      console.warn("⚠️ Alarm matched, but sound NOT enabled yet. Click the button!");
      alert(`⏰ TIME TO TAKE: ${medName}\n(Enable sound to hear the alarm next time)`);
      return;
    }

    // Play Sound
    alarm.play()
      .then(() => {
        // Show Alert after sound starts
        // The setTimeout ensures the sound has a split second to start before the alert pauses JS
        setTimeout(() => {
             alert(`⏰ TIME TO TAKE YOUR MEDICINE: ${medName}`);
             alarm.pause();
             alarm.currentTime = 0;
        }, 100);
      })
      .catch((e) => {
        console.error("Audio play error:", e);
        alert(`⏰ TIME TO TAKE: ${medName}`);
      });
  };

  const enableSound = () => {
    alarm.play().then(() => {
      alarm.pause();
      alarm.currentTime = 0;
      setSoundEnabled(true);
      alert("✅ Sound Enabled! You will hear a beep when it's time.");
    }).catch(e => {
        console.error("Browser blocked sound:", e);
        alert("Could not enable sound. Please check browser permissions.");
    });
  };

  const removeMed = async (id) => {
    if (window.confirm("Are you sure you want to remove this reminder?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/medications/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMedicines(medicines.filter((m) => m._id !== id));
        } else {
          alert("Failed to delete.");
        }
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Pill': return '💊';
      case 'Syrup': return '🧪';
      case 'Injection': return '💉';
      case 'Tablet': return '⬜';
      default: return '💊';
    }
  };

  return (
    <div className="reminders-container">
      <header className="reminders-header">
        <h2>Active Reminders</h2>
        
        {/* Force user to click this to allow browser audio */}
        {!soundEnabled ? (
          <button onClick={enableSound} className="sound-btn warning">
             🔇 Click to Enable Sound (Required)
          </button>
        ) : (
          <button className="sound-btn success" disabled>
             🔊 Sound Active
          </button>
        )}

        <p>You have {medicines.length} medications scheduled.</p>
      </header>

      {medicines.length === 0 ? (
        <div className="empty-state">
          <p>No reminders found. Start by adding a new medicine!</p>
        </div>
      ) : (
        <div className="reminders-grid">
          {medicines.map((m) => (
            <div key={m._id} className="med-card">
              <div className="card-accent"></div>
              <div className="card-content">
                <div className="card-top">
                  <div className="name-section">
                    <span className="med-icon">{getTypeIcon(m.type)}</span>
                    <h3>{m.name}</h3>
                  </div>
                  <span className="time-tag">{m.time}</span>
                </div>

                <div className="med-info">
                  <p><strong>Dosage:</strong> {m.dosage}</p>
                  <p><strong>Frequency:</strong> {m.frequency}</p>
                </div>

                <div className="card-footer">
                  <button onClick={() => removeMed(m._id)} className="del-btn">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reminders;