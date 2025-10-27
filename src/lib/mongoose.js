import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URL is not defined in environment variables.");
}

// ✅ OPTIMIZATION: Global connection caching for Atlas
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// ✅ OPTIMIZED connection function for MongoDB Atlas
const connectMongooseDb = async () => {
  try {
    // Return cached connection if available
    if (cached.conn) {
      return cached.conn;
    }

    // Create new connection promise if not exists
    if (!cached.promise) {
      const opts = {
        bufferCommands: false, // ✅ Disable buffering
        maxPoolSize: 10, // ✅ Limit connection pool for Atlas
        minPoolSize: 2, // ✅ Keep some connections ready
        serverSelectionTimeoutMS: 10000, // ✅ Increased timeout for Atlas
        socketTimeoutMS: 45000, // ✅ Close idle connections
        family: 4, // ✅ Use IPv4
        retryWrites: true, // ✅ Enable retry for Atlas
        w: 'majority' // ✅ Write concern
      };

      console.log('🔗 Connecting to MongoDB Atlas...');
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('✅ MongoDB Atlas connected successfully');
        return mongoose;
      });
    }

    // Wait for connection and cache it
    cached.conn = await cached.promise;
    return cached.conn;
    
  } catch (error) {
    // Reset promise on error to allow retry
    cached.promise = null;
    console.error("❌ MongoDB Atlas connection error:", error.message);
    throw error;
  }
};

// ✅ OPTIONAL: Handle connection events for monitoring
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from MongoDB Atlas');
});

// ✅ Handle app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🟠 MongoDB connection closed due to app termination');
  process.exit(0);
});

export default connectMongooseDb;