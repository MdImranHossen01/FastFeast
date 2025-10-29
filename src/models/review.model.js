import mongoose from "mongoose";

const riderReviewSchema = new mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const itemReviewsSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    riderReview: {
      type: riderReviewSchema,
      required: true,
    },
    itemReviews: {
      type: [itemReviewsSchema],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Avoid overwrite error in dev
if (mongoose.models.Review) {
  mongoose.deleteModel("Review");
}

// Define the Review model
const Review = mongoose.model("Review", reviewSchema);

// Export the Review model
export default Review;
