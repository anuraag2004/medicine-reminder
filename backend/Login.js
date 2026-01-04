require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes'); // Your existing medicine routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Routes
// This maps the authRoutes to "/api", so the full URL becomes "http://localhost:5000/api/login"
app.use('/api', authRoutes); 
app.use('/api/medications', medicationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});