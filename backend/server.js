require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const vendorRoutes = require('./routes/vendorRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB Connection Error', err));

app.use('/vendors', vendorRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});