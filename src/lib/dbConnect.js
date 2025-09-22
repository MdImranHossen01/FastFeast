import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionsName = {
  usersCollection: "users",
  offersCollection: "offers",
  blogsCollection: "blogs",
  foodsCollection: "foods",
  restaurantsCollection: "restaurants",
};

export const dbConnect = (collectionName) => {
  // get .env variables from .env.local file
  const { MONGODB_URI, DB_NAME } = process.env;

  const uri = MONGODB_URI;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  // return db connect, that take collections name as parameter
  return client.db(DB_NAME).collection(collectionName);
};
