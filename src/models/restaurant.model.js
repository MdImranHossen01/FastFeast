import mongoose from "mongoose";

// Define sub-schemas for structured/nested data
const coordinatesSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  coordinates: { type: coordinatesSchema, required: true },
});

const contactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const openingHoursSchema = new mongoose.Schema({
  mon: { open: String, close: String },
  tue: { open: String, close: String },
  wed: { open: String, close: String },
  thu: { open: String, close: String },
  fri: { open: String, close: String },
  sat: { open: String, close: String },
  sun: { open: String, close: String },
});

// Main Restaurant Schema
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      required: true,
    },
    cuisines: [
      {
        type: String,
        required: true,
      },
    ],
    currency: {
      type: String,
      required: true,
    },
    estimatedDeliveryTime: {
      type: String,
      default: "30 min",
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["approved", "pending", "rejected"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    contact: {
      type: contactSchema,
      required: true,
    },
    openingHours: {
      type: openingHoursSchema,
      required: true,
    },
    minOrderValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false } // adds createdAt & updatedAt
);

if (mongoose.models.Restaurant) {
  delete mongoose.models.Restaurant;
}

// Prevent OverwriteModelError during hot reload in Next.js
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
