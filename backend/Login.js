require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. ALLOW ALL ORIGINS (Fixes CORS issues)
app.use(cors({ origin: "*" })); 
app.use(express.json());

// 2. CHECK MONGO URI
if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is missing in .env file");
    process.exit(1);
}

// 3. CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// 4. SETUP ROUTES
// This makes the login URL: http://localhost:5000/api/login
app.use('/api', authRoutes); 

// 5. TEST ROUTE
app.get('/', (req, res) => {
    res.send("Backend is working!");
});

// 6. START SERVER ON 0.0.0.0 (Fixes Windows connection bugs)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});