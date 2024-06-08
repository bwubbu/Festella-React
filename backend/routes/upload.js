// backend/Routes/upload.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

// Upload file to Imgur and return the URL
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const formData = new FormData();
  formData.append('image', req.file.buffer.toString('base64'));

  try {
    const response = await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
        ...formData.getHeaders(),
      },
    });

    const imageUrl = response.data.data.link;
    res.status(200).send({ fileUrl: imageUrl });
  } catch (error) {
    console.error('Failed to upload image to Imgur:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    res.status(500).send('Failed to upload image to Imgur');
  }
});

module.exports = router;
