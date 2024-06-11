const express = require('express');
const router = express.Router();
const RSVP = require('../model/rsvp');

// Get all RSVPs
router.get('/', async (req, res) => {
  try {
    const rsvps = await RSVP.find();
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new RSVP
router.post('/', async (req, res) => {
  const rsvp = new RSVP({
    name: req.body.name,
    Event: req.body.dietaryRequirements
  });

  try {
    const newRsvp = await rsvp.save();
    res.status(201).json(newRsvp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;