import mongoose from "mongoose";

// Function to connect to MongoDB using Mongoose
const connectMongooseDb = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return true;
    }

    // Use the correct env variable
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
    return { success: true, message: "Connected to MongoDB" };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return { success: false, message: error.message };
  }
};

export default connectMongooseDb;

