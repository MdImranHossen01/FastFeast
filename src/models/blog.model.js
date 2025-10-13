import mongoose from "mongoose";

// Define the Blog schema with timestamps
const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    visitCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

if (mongoose.models.Blog) {
  mongoose.deleteModel("Blog");
}

const Blog = mongoose.model("Blog", blogSchema);

// Create or retrieve the old Blog model
// const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

// Export the Blog model
export default Blog;
