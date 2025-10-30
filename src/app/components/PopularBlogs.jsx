"use client";

import Link from "next/link";
import BlogCard from "../blogs/components/BlogCard";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PopularBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (Array.isArray(data.blogs)) arr = data.blogs;
        else if (Array.isArray(data.data)) arr = data.data;
        else console.warn("Unexpected blogs API shape:", data);

        setBlogs(arr);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const topPosts = Array.isArray(blogs)
    ? [...blogs]
        .sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0))
        .slice(0, 4)
    : [];

  // Animation variants for smooth staggered entrance
  const cardVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction.x,
      y: direction.y,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const directions = [
    { x: -60, y: 0 },
    { x: 60, y: 0 },
    { x: 0, y: 60 },
    { x: 0, y: -60 },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-orange-50 via-white to-orange-50 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-14 px-4"
      >
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
          Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-400">Blogs</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Our most loved articles — carefully curated to feed your curiosity and taste buds.  
          Explore trending stories, culinary secrets, and modern food culture.
        </p>

        {/* Decorative accent line */}
        <div className="mt-5 mx-auto w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"></div>
      </motion.div>

      {/* Blog Cards */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading popular blogs...
          </div>
        ) : topPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No blogs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPosts.map((blog, i) => (
              <motion.div
                key={blog._id || i}
                custom={directions[i % 4]}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.15 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Show All button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center pt-14"
      >
        <Link
          href="/blogs"
          className="group my-12 flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-600 to-yellow-400 
                     text-white font-semibold rounded-full shadow-md hover:shadow-lg 
                     transition-all duration-300 hover:-translate-y-0.5"
        >
          Show All
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
