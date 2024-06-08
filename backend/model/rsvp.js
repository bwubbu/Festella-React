const mongoose = require('mongoose');

const RSVP = new mongoose.Schema({
  name: { type: String, required: true },
  dietaryRequirements: { type: String, required: true }
});

module.exports = mongoose.model('RSVP', RSVP);
