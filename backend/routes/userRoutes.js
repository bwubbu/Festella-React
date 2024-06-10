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
            res.status(201).json(user)
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
    const { id, name, username, password, image } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (name) user.profile.name = name;
        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, saltRounds);
        if (image) user.profile.image = image;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Bookmark an event
router.post('/bookmark/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const userId = req.body.userId; // Assumes user ID is sent in the body
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (!user.profile.bookmarks.includes(eventId)) {
        user.profile.bookmarks.push(eventId);
        await user.save();
      }
  
      res.status(200).json(user.profile.bookmarks);
    } catch (error) {
      res.status(500).json({ message: 'Error bookmarking event', error });
    }
  });
  
  // Get bookmarked events for a user
  router.get('/bookmarks/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId).populate('profile.bookmarks');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(user.profile.bookmarks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookmarks', error });
    }
  });
  

module.exports = router;