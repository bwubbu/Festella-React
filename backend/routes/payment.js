const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/stripe-payment", async (req, res) => {
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

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Payment Confirmation',
      text: `Your payment of MYR ${amount} was successful. Thank you for your purchase! Don't forget to review the event!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        // Email failed to send, but the payment was successful
        return res.status(500).send({ error: "Payment was successful, but email could not be sent" });
      }
      console.log("Email sent: " + info.response);
      // Email sent successfully, return success response
      return res.status(200).send(charge);
    });
  } catch (error) {
    console.error("Error processing payment: ", error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;