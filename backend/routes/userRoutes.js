const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Login successful');
            res.status(201).json(user);
        } else {
            res.send('Login failed');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, email, password: hash });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;