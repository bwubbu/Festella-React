const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // check if user already exists
  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already registered.');

  // create new user
  const salt = await bcrypt.genSalt(10);
  user = new User({
    email,
    password: await bcrypt.hash(password, salt),
    // add other fields as necessary
  });

  await user.save();

  // create and return a new JWT
  const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
  res.send(token);
});

module.exports = router;