const express = require('express');
const router = express.Router();
const Event = require('../model/eventmodels');

// Get top 6 events by rating
router.get('/events/top', async (req, res) => {
  try {
    // console.log('Fetching top events...');
    const events = await Event.find().sort({ rating: -1 }).limit(6);
    // console.log('Top events fetched:', events);
    res.json(events);
  } catch (err) {
    console.error('Error fetching top events:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get an event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error('Error fetching event:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
router.post('/events', async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Update an event
router.put('/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Error deleting event:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get the latest event ID
router.get('/events/latest-id', async (req, res) => {
  try {
    const latestEvent = await Event.findOne().sort({ id: -1 }).exec();
    console.log('Latest Event:', latestEvent);  // Logging latest event
    const latestId = latestEvent ? latestEvent.id : 0;
    console.log('Latest Event ID:', latestId);  // Logging latest event ID
    res.json({ latestId });
  } catch (err) {
    console.error('Error fetching latest ID:', err.message);
    res.status(500).json({ message: 'Failed to fetch the latest event ID', error: err.message });
  }
});

module.exports = router;
