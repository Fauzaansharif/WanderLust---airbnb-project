const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggenIn,
  isReviewAuthor,
} = require("../middlewares.js");
const reviewController = require("../controllers/review.js");

//review post route
router.post(
  "/",
  isLoggenIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

//review delete route
router.delete(
  "/:reviewId",
  isLoggenIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
