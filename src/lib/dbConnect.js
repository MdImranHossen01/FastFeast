import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionsName = {
  usersCollection: "users",
  offersCollection: "offers",
  blogsCollection: "blogs",
  foodsCollection: "foods",
  restaurantsCollection: "restaurants",
  reviewsCollection: "reviews",
  ordersCollection: "orders",
  transactionHistoryCollection: "transactionHistory",
  favoritesCollection: "favorites",
  notificationsCollection: "notifications", // ✅ added
};

// Cache the database connection
let cachedClient = null;
let cachedDb = null;

export const connectToDatabase = async () => {
  // If we already have a connection, return it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Get environment variables
  const { MONGODB_URI, DB_NAME } = process.env;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (!DB_NAME) {
    throw new Error("Please define the DB_NAME environment variable");
  }

  // Create a new MongoClient
  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  // Connect to the MongoDB cluster
  await client.connect();

  // Specify the database
  const db = client.db(DB_NAME);

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
};

// Helper to get a collection
export const getCollection = async (collectionName) => {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
};

// Backward-compatible alias (returns a collection)
export const dbConnect = async (collectionName) => {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
};
