const mongoose = require('mongoose');

const RSVP = new mongoose.Schema({
  name: { type: String, required: true },
  Event: { type: String, required: true }
});

module.exports = mongoose.model('RSVP', RSVP);
