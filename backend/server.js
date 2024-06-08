require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB Connection Error', err));

// Routes
app.use('/rsvps', rsvpsRouter);
app.use('/vendors', vendorRoutes);
app.use('/user', userRoutes);
app.use('/', eventRoutes);
app.use('/', uploadRoutes);

// Stripe payment route
app.post("/api/stripe-payment", async (req, res) => {
  const { amount, email, token } = req.body;

  if (!amount || !email || !token) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    const customer = await stripe.customers.create({
      email: email,
      source: token.id,
      name: token.card.name,
    });

    const charge = await stripe.charges.create({
      amount: parseFloat(amount) * 100, // Amount in cents
      description: `Payment for MYR ${amount}`,
      currency: "MYR",
      customer: customer.id,
    });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Payment Confirmation',
      text: `Your payment of MYR ${amount} was successful. Thank you for your purchase!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return res.status(500).send({ error: "Payment was successful, but email could not be sent" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).send(charge);
    });

  } catch (error) {
    console.error("Error processing payment: ", error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
