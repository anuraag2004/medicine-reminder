const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Required for password encryption
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURATION ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.mongodb.net/medicine_reminder?retryWrites=true&w=majority';
const JWT_SECRET = 'your_super_secret_key'; 

// --- CONNECT TO DATABASE ---
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// --- USER SCHEMA ---
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Stores hashed password
});
const User = mongoose.model('User', userSchema);

// --- ROUTES ---

// 1. REGISTER API
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash the password (Encrypt it)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save to DB
    const newUser = new User({ 
      fullName, 
      email, 
      password: hashedPassword 
    });
    
    await newUser.save();

    res.status(201).json({ message: "User registered successfully! Please login." });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// 2. LOGIN API (Keep this for the login page)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.fullName, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));