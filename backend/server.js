require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- IMPORTS ---
// 1. Existing Medication Routes
const medicationRoutes = require('./routes/medicationRoutes');
// 2. NEW: Import the Auth Routes (Add this line)
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// --- ROUTES ---
// 1. Existing Medication Route
app.use('/api/medications', medicationRoutes);

// 2. NEW: Add the Auth Route (Add this line)
// This enables http://localhost:5000/api/auth/login and /register
app.use('/api/auth', authRoutes);

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

