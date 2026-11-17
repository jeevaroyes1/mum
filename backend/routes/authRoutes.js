const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');

// Helper to seed initial admin user if none exists
const seedInitialAdmin = async () => {
  try {
    const existing = await AdminUser.findOne({ email: 'admin@mum.lu' });
    if (!existing) {
      await AdminUser.create({
        name: 'MUM Administrator',
        email: 'admin@mum.lu',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Default admin user seeded: admin@mum.lu / admin123');
    }
  } catch (err) {
    console.error('Error auto-seeding admin user:', err.message);
  }
};

// Seed on module load
seedInitialAdmin();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await AdminUser.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No admin found with this email address.',
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please check your credentials.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Admin authenticated successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
    });
  }
});

// POST /api/auth/signup (or register another admin)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await AdminUser.findOne({ email: cleanEmail });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An admin account with this email already exists.',
      });
    }

    const newUser = await AdminUser.create({
      name: name || 'Admin User',
      email: cleanEmail,
      password: password,
      role: 'admin',
    });

    return res.status(201).json({
      success: true,
      message: 'Admin account created successfully.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error creating admin account.',
    });
  }
});

// GET /api/auth/verify (check if current token/session or email exists)
router.get('/verify', async (req, res) => {
  try {
    const adminCount = await AdminUser.countDocuments();
    return res.status(200).json({
      success: true,
      totalAdmins: adminCount,
      defaultAdminAvailable: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error checking auth.' });
  }
});

module.exports = router;
