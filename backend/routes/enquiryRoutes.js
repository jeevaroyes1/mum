const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');

const enquiryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[+]?[\d\s\-().]{7,20}$/).withMessage('Please enter a valid phone number'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
];

router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching enquiries' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid enquiry ID' });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching enquiry' });
  }
});

//POST create a new enquiry
router.post('/', enquiryValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, message, status } = req.body;
    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
      status: status || 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: newEnquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating enquiry' });
  }
});

//PUT update an existing enquiry
router.put('/:id', enquiryValidation, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid enquiry ID' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, message, status } = req.body;
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, message, status },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: updatedEnquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating enquiry' });
  }
});

//DELETE an enquiry
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid enquiry ID' });
    }

    const deletedEnquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deletedEnquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting enquiry' });
  }
});

module.exports = router;