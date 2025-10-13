import mongoose from "mongoose";

// Function to connect to MongoDB using Mongoose
const connectMongooseDb = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return true;
    }

    // Use the correct env variable
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables.");
    }

    // Connect to MongoDB
<<<<<<< HEAD
    await mongoose.connect(process.env.MONGODB_URL);
=======
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
>>>>>>> a139315aa346a7c0144b9ab98e07f0f60c58fb8c

    // Return success message
    return { success: true, message: "Connected to MongoDB" };
  } catch (error) {
    // Handle connection errors
    return { success: false, message: error.message };
  }
};

// Export the connection function
export default connectMongooseDb;
