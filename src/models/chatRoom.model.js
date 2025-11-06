import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    subject: String,
    orderId: String
  }
}, {
  timestamps: true
});

chatRoomSchema.index({ participants: 1 });
chatRoomSchema.index({ restaurantId: 1 });
chatRoomSchema.index({ lastActivity: -1 });

chatRoomSchema.virtual('roomId').get(function() {
  return this._id.toString();
});

export default mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);