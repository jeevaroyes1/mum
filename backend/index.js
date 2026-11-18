const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const enquiryRoutes = require('./routes/enquiryRoutes');
const authRoutes = require('./routes/authRoutes');

// Load .env when not in production (Vercel provides env vars automatically)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '.env') });
}

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Handle malformed JSON request bodies cleanly
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Invalid JSON payload provided.' });
  }
  next(err);
});

// Health check routes (responds immediately without blocking on DB)
const healthHandler = (req, res) => {
  res.json({
    success: true,
    message: 'MUM Assessment API is running...',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting_or_disconnected',
  });
};

app.get('/', healthHandler);
app.get('/api', healthHandler);
app.get('/api/health', healthHandler);

// Middleware to ensure DB connection before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection middleware error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed. Please verify MongoDB Atlas network access and environment variables.',
    });
  }
});

// Synchronously mount API routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/auth', authRoutes);

// Fallback route mounts in case proxy forwards without /api prefix
app.use('/enquiries', enquiryRoutes);
app.use('/auth', authRoutes);

// 404 Handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

module.exports = app;
