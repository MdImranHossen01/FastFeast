import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    items: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        specialInstructions: { type: String },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      required: true,
    },
    paymentIntentId: { type: String },
    pricing: {
      subtotal: { type: Number, required: true },
      deliveryFee: { type: Number, required: true },
      tax: { type: Number, required: true },
      total: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "processing",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    orderDate: { type: Date, default: Date.now },
    estimatedDelivery: { type: Date, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
