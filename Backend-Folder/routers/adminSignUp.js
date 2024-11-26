const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/Admin.model');
require('dotenv').config(); // To load the environment variable

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const users = await AdminModel.find();
    res.status(200).json({ data: users });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(400).json({ error: err.message });
  }
});

// Admin sign-up route
router.post('/', async (req, res) => {
  try {
    const { name, email, password} = req.body;

   
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }


    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new AdminModel({
      name,
      email,
      password: hashedPassword
       // Default to 'admin' if no role is provided
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (err) {
    console.error(err); //just to check error //kindly ignore
    res.status(500).json({ error: 'Error creating admin account. Please try again.' });
  }
});

module.exports = router;
