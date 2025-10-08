// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

router.post('/login', async (req, res) => {
  const { password } = req.body;
  const owner = await Owner.findOne({}); // Assuming single owner
  if (!owner) return res.status(400).json({ message: 'Owner not found' });

  const isMatch = await bcrypt.compare(password, owner.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: owner._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});
