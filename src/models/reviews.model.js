import mongoose from "mongoose";

const riderReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: "",
    trim: true
  }
}, { _id: false });

const itemReviewSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Menu' // Reference to your Menu model
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: "",
    trim: true
  },
  itemName: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order', // Reference to your Order model
    unique: true // Prevent multiple reviews for the same order
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Rider' // Reference to your Rider model
  },
  riderReview: {
    type: riderReviewSchema,
    default: null
  },
  itemReviews: [itemReviewSchema]
}, {
  timestamps: true // This will automatically add createdAt and updatedAt
});

// Index for better query performance
reviewSchema.index({ orderId: 1 });
reviewSchema.index({ customerEmail: 1 });
reviewSchema.index({ riderId: 1 });
reviewSchema.index({ createdAt: -1 });

// Virtual for checking if review has any content
reviewSchema.virtual('hasReviews').get(function() {
  return !!(this.riderReview || (this.itemReviews && this.itemReviews.length > 0));
});

// Method to calculate average rating
reviewSchema.methods.getAverageRating = function() {
  let totalRating = 0;
  let count = 0;

  if (this.riderReview && this.riderReview.rating) {
    totalRating += this.riderReview.rating;
    count++;
  }

  if (this.itemReviews && this.itemReviews.length > 0) {
    this.itemReviews.forEach(item => {
      if (item.rating) {
        totalRating += item.rating;
        count++;
      }
    });
  }

  return count > 0 ? (totalRating / count).toFixed(1) : 0;
};

// Static method to find reviews by customer email
reviewSchema.statics.findByCustomerEmail = function(email) {
  return this.find({ customerEmail: email }).sort({ createdAt: -1 });
};

// Static method to find reviews by rider ID
reviewSchema.statics.findByRiderId = function(riderId) {
  return this.find({ riderId: riderId }).sort({ createdAt: -1 });
};

// Static method to get average rating for a rider
reviewSchema.statics.getRiderAverageRating = function(riderId) {
  return this.aggregate([
    { $match: { riderId: new mongoose.Types.ObjectId(riderId), 'riderReview.rating': { $exists: true } } },
    { $group: { _id: '$riderId', averageRating: { $avg: '$riderReview.rating' } } }
  ]);
};

// Static method to get average rating for a menu item
reviewSchema.statics.getItemAverageRating = function(itemId) {
  return this.aggregate([
    { $unwind: '$itemReviews' },
    { $match: { 'itemReviews.itemId': new mongoose.Types.ObjectId(itemId) } },
    { $group: { _id: '$itemReviews.itemId', averageRating: { $avg: '$itemReviews.rating' } } }
  ]);
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;