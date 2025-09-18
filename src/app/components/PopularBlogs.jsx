"use client";

import Link from "next/link";
import { posts } from "../blogs/posts";
import BlogCard from "../blogs/components/BlogCard";


export default function PopularBlogs() {
  // sort posts by visit count and take top 4
  const topPosts = [...posts]
    .sort((a, b) => b.visitCount - a.visitCount)
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Popular Blogs
        </h2>
        <Link
          href="/blogs"
          className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Show All
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

