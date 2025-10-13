import mongoose from "mongoose";

// Sub-schema for coordinates
const coordinatesSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

// Sub-schema for location
const locationSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: { type: coordinatesSchema, required: true },
  },
  { _id: false }
);

// Sub-schema for contact information
const contactSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

// Sub-schema for opening hours
const openingHoursSchema = new mongoose.Schema(
  {
    mon: { open: String, close: String },
    tue: { open: String, close: String },
    wed: { open: String, close: String },
    thu: { open: String, close: String },
    fri: { open: String, close: String },
    sat: { open: String, close: String },
    sun: { open: String, close: String },
  },
  { _id: false }
);

// Main Restaurant Schema
const restaurantSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
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
      enum: ["BDT", "USD", "EUR", "GBP", "INR"],
      default: "BDT",
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    estimatedDeliveryTime: {
      type: String,
      default: "30 min",
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
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["approved", "pending", "rejected"],
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Delete existing model to prevent OverwriteModelError in development
if (mongoose.models.Restaurant) {
  mongoose.deleteModel("Restaurant");
}

// Auto Generate Slug from Name
restaurantSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }

  next();
});

// Prevent OverwriteModelError during hot reload in Next.js
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Export the model
export default Restaurant;
