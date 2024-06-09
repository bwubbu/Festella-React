require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const rsvpsRouter = require('./routes/rsvps');
const vendorRoutes = require('./routes/vendorRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventroutes');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB Connection Error', err));

// Routes
app.use('/rsvps', rsvpsRouter);
app.use('/vendors', vendorRoutes);
app.use('/user', userRoutes);
app.use('/events', eventRoutes);
app.use('/', uploadRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
