const Review = require("../models/reviews.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
  let listingId = req.params.id;
  let listing = await Listing.findById(listingId);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!!");

  res.redirect(`/listings/${listingId}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Review Deleted!!");

  res.redirect(`/listings/${id}`);
};
