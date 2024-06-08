// backend/Models/eventmodels.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  downloads: { type: String, required: true },
  images: { type: [String], required: true },
  videoLink: { type: String, required: true },
  description: { type: String, required: true },
  ticketSold: { type: Number, required: true },
  totalTicket: { type: Number, required: true }
}, { collection: 'events' });

const Event = mongoose.model('events', eventSchema);

module.exports = Event;
