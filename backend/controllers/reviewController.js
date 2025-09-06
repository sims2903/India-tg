// backend/controllers/reviewController.js

const Review = require('../models/Review');

const createReview = async (req, res) => {
  try {
    const {
      userId,
      placeId,
      placeName,
      reviewText,
      rating,
      image,
      tags
    } = req.body;

    const review = new Review({
      userId,
      placeId,
      placeName,
      reviewText,
      rating,
      image,
      tags
    });

    await review.save();
    res.status(201).json({ message: 'Review created', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate('userId', 'name avatar') // assuming User model has 'name' and 'avatar'
        .sort({ createdAt: -1 }); // latest first
  
      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  };
  
  module.exports = {
    createReview,
    getAllReviews
  };
