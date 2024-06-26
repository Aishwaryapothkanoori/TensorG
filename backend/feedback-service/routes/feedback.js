const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const axios = require('axios');

// Submit feedback
router.post('/submit', async (req, res) => {
  const feedback = new Feedback({
    userId: req.user.id,
    category: req.body.category,
    rating: req.body.rating,
    comments: req.body.comments
  });

  try {
    await feedback.save();
    await axios.post('https://api.frill.co/v1/feedback', {
      user: req.user.id,
      category: req.body.category,
      rating: req.body.rating,
      comments: req.body.comments
    }, {
      headers: { 'Authorization': `Bearer YOUR_FRILL_API_KEY` }
    });
    res.status(201).send('Feedback submitted');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve aggregated feedback
router.get('/aggregate', async (req, res) => {
  try {
    const aggregateData = await Feedback.aggregate([
      { $group: { _id: '$category', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    res.json(aggregateData);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
