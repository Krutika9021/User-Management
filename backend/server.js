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

app.get('/', (req, res) => {
  res.send('🎉 Backend is live! Try accessing /api/users');
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
