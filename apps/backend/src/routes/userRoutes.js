// const express = require('express');
import express from 'express';
const router = express.Router();
// const User = require('../models/User');
// import User from '../models/User.js'
import {auth} from '../middlewares/authMiddleware.js';
import { getProfile, resetPassword, updateProfile } from '../controllers/userController.js';

// POST /api/users — Register a user
// router.post('/users', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validate input
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: 'Name, email, and password are required.' });
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: 'User already exists.' });
//     }

//     // Create and save new user
//     const newUser = new User({ name, email, password });
//     await newUser.save();

//     // Don't send password back
//     const { password: _, ...userData } = newUser.toObject();
//     res.status(201).json(userData);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// GET /api/users — Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({}, '-password').sort({ createdAt: -1 }); // exclude password
//     res.status(200).json(users);
//     // res.json(users);
//     // res.status(200).json({ message: 'Users fetched successfully', users });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/login', (req, res) => {
//   res.send({ message: 'Hello API from backend' });
// });



// router.get('/get-profile', getProfile);
router.get('/get-profile', auth, getProfile);
router.put('/update-profile', auth, updateProfile);
router.put('/reset-password', auth, resetPassword);

// module.exports = router;
export default router
