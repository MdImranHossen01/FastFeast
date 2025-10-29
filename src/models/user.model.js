import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "rider", "restaurantOwner", "moderator", "admin"],
      default: "user",
    },
    location: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    provider: {
      type: String,
      enum: ["credentials", "github", "google"],
      default: "credentials",
    },
    resetTokenExpiry: {
      type: Number,
      default: null,
    },
    resetToken: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Prevent model overwrite upon initial compile
if (mongoose.models.User) {
  mongoose.deleteModel("User");
}

// This checks if the model already exists before compiling it again
// const User = mongoose.models.User || mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
