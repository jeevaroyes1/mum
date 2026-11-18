const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load .env when not in production (Vercel provides env vars automatically)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '.env') });
}

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'MUM Assessment API is running...' });
});

// Initialise DB and mount routes
(async () => {
  await connectDB();
  const enquiryRoutes = require('./routes/enquiryRoutes');
  const authRoutes = require('./routes/authRoutes');
  app.use('/api/enquiries', enquiryRoutes);
  app.use('/api/auth', authRoutes);
})();

module.exports = app;
