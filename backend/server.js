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
const forumRoutes = require('./routes/forumRoutes');
const groupRoutes = require('./routes/groupRoutes');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

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
app.use('/posts', forumRoutes);
app.use('/api/groups', groupRoutes);
app.use('/', uploadRoutes);
app.use('/payment', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

