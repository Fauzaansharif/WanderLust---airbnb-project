const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const { isLoggenIn, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//create route
router.get("/new", isLoggenIn, listingController.renderNewForm);

// /
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggenIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing),
  );

// id
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggenIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isLoggenIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggenIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
