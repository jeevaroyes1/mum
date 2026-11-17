const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'MUM Assessment API is running...' });
});

// Connect to DB first, then register routes (so seeders run after connection is ready)
const startServer = async () => {
  await connectDB();

  // API Routes — imported after DB is connected so seeders fire safely
  const enquiryRoutes = require('./routes/enquiryRoutes');
  const authRoutes = require('./routes/authRoutes');
  app.use('/api/enquiries', enquiryRoutes);
  app.use('/api/auth', authRoutes);

  // 404 Handler — must come AFTER routes are mounted
  app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
