const express = require('express');
const router = express.Router();
const { Profile, User } = require('../model/user');
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
            res.status(201).json(user);
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, email, password: hash, profile: { name: '', image: '' } });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/edit', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.username = req.body.username;
        user.profile.name = req.body.name;
        user.profile.image = req.body.image;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update', async (req, res) => {
    const { id, updatedUser } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = updatedUser.username || user.username;
        user.email = updatedUser.email || user.email;

        if (updatedUser.profile) {
            user.profile.name = updatedUser.profile.name || user.profile.name;
            user.profile.image = updatedUser.profile.image || user.profile.image;
            user.profile.bookmarkedEvents = updatedUser.profile.bookmarkedEvents || user.profile.bookmarkedEvents;
            user.profile.registeredEvents = updatedUser.profile.registeredEvents || user.profile.registeredEvents;
        }

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;