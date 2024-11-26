const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/Admin.model');

require('dotenv').config(); // To load the environment variable

const router = express.Router();

// Admin sign-in route

router.get('/', async (req, res) => {
    try {
      const users = await AdminModel.find();
      res.status(200).json({ data: users });
    } catch (err) {
      console.error(err);  // Log the error for debugging
      res.status(400).json({ error: err.message });
    }
  });
  
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation for required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find the admin by email
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } )

   
    res.status(200).json({
      message: 'Admin signed in successfully',
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:err.message });
  }
});

module.exports = router;
