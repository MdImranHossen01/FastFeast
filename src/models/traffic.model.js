import mongoose from "mongoose";

const trafficSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    userAgent: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    },
    pageViews: {
      type: Number,
      default: 1
    },
    lastActivity: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Create TTL index to automatically remove old sessions after 10 minutes
// This gives more accurate real-time tracking
trafficSchema.index({ lastActivity: 1 }, { expireAfterSeconds: 600 });

const Traffic = mongoose.models.Traffic || mongoose.model("Traffic", trafficSchema);

export default Traffic;