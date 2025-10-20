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
    },
    comment: {
      type: String,
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
    },
    comment: {
      type: String,
    },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
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

export default mongoose.model("Review", reviewSchema);
