// server/routes/video.js
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const Video = require('../models/Video');
const auth = require('../middleware/auth');

AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();

router.post('/upload', auth, async (req, res) => {
  const { file, category } = req.body; // File from frontend, category: Straight/Gay/Lesbian
  const params = {
    Bucket: 'your-bucket-name',
    Key: `${Date.now()}_${file.name}`,
    Body: file,
  };

  s3.upload(params, async (err, data) => {
    if (err) return res.status(500).json({ message: 'Upload failed' });
    const video = new Video({
      url: data.Location,
      category,
      isFree: false, // Default paid, manually set first 2 as free
    });
    await video.save();
    res.json({ message: 'Video uploaded', url: data.Location });
  });
});
