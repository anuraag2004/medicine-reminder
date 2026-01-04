require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json());

// Database Connection
// We add a check here so it tells you if the link is missing
if (!process.env.MONGO_URI) {
    console.error("❌ CRITICAL ERROR: MONGO_URI is missing in .env file");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api', authRoutes); // Login will be at /api/login
app.use('/api/medications', medicationRoutes);

// Root Route (To test in browser)
app.get('/', (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});