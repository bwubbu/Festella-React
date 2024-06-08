const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  image: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  name: String,
  description: String,
  service: String,
  availability: String,
  map: String,
  bookings: [{
    name: String,
    email: String,
    date: Date,
    time: String,
    notes: String
  }]
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;