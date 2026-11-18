const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'MUM Administrator',
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminUser', adminUserSchema);
