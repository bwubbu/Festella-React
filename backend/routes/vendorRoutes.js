const express = require('express');
const router = express.Router();
const Vendor = require('../model/vendor');

router.get('/', async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

router.post('/register', async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/book', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    vendor.bookings.push(req.body);
    await vendor.save();
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;