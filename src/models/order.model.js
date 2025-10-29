import mongoose from "mongoose";

// Define the Item schema
const itemSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    specialInstructions: { type: String, default: "" },
  },
  { _id: false }
);

// Define the CustomerInfo schema
const customerInfoSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { _id: false }
);

// Define the Pricing schema
const pricingSchema = new mongoose.Schema(
  {
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);

// Define the RiderInfo schema
const riderInfoSchema = new mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      required: true,
    },
    riderName: { type: String, required: true },
    riderEmail: { type: String, required: true },
    riderPhone: { type: String, required: true },
    photoUrl: { type: String, required: true },
    vehicleType: { type: String, required: true },
  },
  { _id: false }
);

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    customerInfo: { type: customerInfoSchema, required: true },
    items: { type: [itemSchema], required: true },
    paymentMethod: { type: String },
    paymentIntentId: { type: String },
    pricing: { type: pricingSchema, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "assignedRider",
        "outforDelivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "refunded"],
      default: "unpaid",
    },
    estimatedDelivery: { type: Date },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    riderInfo: {
      type: riderInfoSchema,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Create or retrieve the old Order model
if (mongoose.models.Order) {
  mongoose.deleteModel("Order");
}

// Create and export the Order model
const Order = mongoose.model("Order", orderSchema);

// Export the Order model
export default Order;
