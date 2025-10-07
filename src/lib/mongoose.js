import mongoose from "mongoose";

// Function to connect to MongoDB using Mongoose
const connectMongooseDb = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return true;
    }

    // Ensure the MONGODB_URL environment variable is set
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables.");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);

    // Return success object on successful connection
    return { success: true, message: "Connected to MongoDB" };
  } catch (error) {
    // Return error object on failure
    return { success: false, message: error.message };
  }
};

// Export the connection function
export default connectMongooseDb;
