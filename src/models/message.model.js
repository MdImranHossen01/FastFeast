import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    index: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ["text", "image", "file", "system"],
    default: "text"
  },
  attachments: [{
    url: String,
    filename: String,
    fileType: String,
    size: Number
  }],
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  deletedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true
});

messageSchema.index({ roomId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1, receiverId: 1 });

export default mongoose.models.Message || mongoose.model("Message", messageSchema);