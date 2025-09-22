"use client";

import Link from "next/link";
import BlogCard from "../blogs/components/BlogCard";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PopularBlogs() {
 const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);



  // sort posts by visit count and take top 4
  const topPosts = [...posts]
    .sort((a, b) => b.visitCount - a.visitCount)
    .slice(0, 4);

  // smooth animation from 4 directions but keep layout stable
  const directions = [
    { x: -80, y: 0 }, // left
    { x: 80, y: 0 },  // right
    { x: 0, y: -80 }, // top
    { x: 0, y: 80 },  // bottom
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-6xl md:text-4xl font-bold text-gray-900">
          Popular <span className="text-orange-500">Blogs</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Discover our most-read blogs, handpicked by our readers. 
          Stay updated with the latest trends, guides, and stories 
          from food, lifestyle, and beyond.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-gray-500">Loading popular blogs...</div>
        ) : topPosts.length === 0 ? (
          <div className="text-gray-500">No blogs found.</div>
        ) : (
          topPosts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ ...directions[i % 4], opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))
        )}
      </div>

      {/* Show All button at bottom */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <Link
            href="/blogs"
            className="flex items-center gap-2 px-6 py-3 hover:bg-orange-500 hover:text-white text-orange-600 rounded-lg bg-none transition"
          >
            Show All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
 
