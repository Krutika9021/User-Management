const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env before using process.env

const userRoutes = require('./routes/userRoutes'); // Your routes file (corrected)

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const User = require("./models/User");

app.get("/api/get-all-users", async (req, res) => {
  try {
    const users = await User.find(); // assuming Mongoose is used
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 🔁 Optional Health Route for testing
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running ✅" });
});

// Debug: print your MONGO_URI
console.log("MONGO_URI is:", process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/users', require('./routes/userRoutes'));


app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
