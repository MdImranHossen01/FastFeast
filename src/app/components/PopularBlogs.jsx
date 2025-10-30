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

  // Framer Motion animation settings
  const cardVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction.x,
      y: direction.y,
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
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
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,179,71,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(255,140,0,0.15),transparent_60%)] pointer-events-none"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-16 px-4"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Popular{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-400">
            Blogs
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
          Discover what everyone’s reading! These trending articles are handpicked for
          food lovers — full of stories, flavors, and culinary secrets.
        </p>
        <div className="mt-5 mx-auto w-20 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full shadow-md shadow-orange-300/30"></div>
      </motion.div>

      {/* Blog Cards */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
  {/* Spinner */}
  <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>

  {/* Animated gradient text */}
  <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 
                bg-[length:200%_auto] animate-[shimmer_2.5s_linear_infinite]
                dark:from-orange-400 dark:via-yellow-300 dark:to-orange-500">
    Loading Popular Blogs...
  </p>

  <style jsx>{`
    @keyframes shimmer {
      0% {
        background-position: 0% center;
      }
      100% {
        background-position: 200% center;
      }
    }
  `}</style>
</div>

        ) : topPosts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
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
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Show All button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-center mt-16"
      >
        <Link
          href="/blogs"
          className="group flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-orange-600 to-yellow-400 
                     text-white font-semibold rounded-full shadow-lg shadow-orange-300/40 
                     hover:shadow-orange-400/60 hover:-translate-y-0.5
                     transition-all duration-300"
        >
          Show All
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
