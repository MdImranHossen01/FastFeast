import mongoose from "mongoose";
import { ref } from "process";

const OrderSchema = new mongoose.Schema(
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
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        specialInstructions: { type: String, default: "" },
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["cash", "card", "sslcommerz"],
      default: "cash",
    },

    paymentIntentId: { type: String, default: null }, // for Stripe/SSLCommerz IDs
    transactionId: { type: String, default: null }, // optional if you use SSLCommerz tran_id

    pricing: {
      subtotal: { type: Number, required: true },
      deliveryFee: { type: Number, required: true },
      tax: { type: Number, required: true },
      total: { type: Number, required: true },
    },

    status: {
      type: String,
      enum: ["pending", "paid", "processing", "delivered", "cancelled"],
      default: "pending",
    },

    orderDate: { type: Date, default: Date.now },
    estimatedDelivery: { type: Date },
    userId: { type: String, default: null }, // from NextAuth session
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent model overwrite in development (Next.js hot reload fix)
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
