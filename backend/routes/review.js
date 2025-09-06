const express = require('express');
const router = express.Router();
const { createReview, getAllReviews } = require('../controllers/reviewController');

router.post('/add', createReview);
router.get('/', getAllReviews); // <-- NEW route to fetch reviews

module.exports = router;

