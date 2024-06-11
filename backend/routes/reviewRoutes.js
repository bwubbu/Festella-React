const express = require('express');
const router = express.Router();
const multer = require('multer');
const Review = require('../model/review');

// Multer configuration for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.array('images', 5), async (req, res) => {
  try {
    const { eventId, username, rating, comment } = req.body;
    const images = req.files.map(file => file.buffer.toString('base64'));

    const review = new Review({ eventId, username, rating, comment, images });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:eventId', async (req, res) => {
  try {
    const reviews = await Review.find({ eventId: req.params.eventId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
