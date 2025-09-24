"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import SearchBar from "./SearchBar";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function BlogContent({ posts }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const allTags = ["All", ...new Set(posts.flatMap((p) => p.tags || []))];

  const filtered = posts.filter((p) => {
    const matchTag = tag === "All" ? true : p.tags?.includes(tag);
    const matchQuery =
      query.trim() === ""
        ? true
        : p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQuery;
  });

  return (
    <main className="container mx-auto px-4 pb-8 pt-20 space-y-6">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center space-y-6">
        <div>
          <h1 className="text-4xl font-extrabold py-5 bg-gradient-to-r from-red-700 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            FastFeast Food Journal – Tradition Meets Delivery
          </h1>
          <p className="text-gray-600">
            Read about Bangladeshi cultural foods, modern delivery trends, and
            tasty tips for foodies across the nation. Latest tips, rider guides
            and food ordering news.
          </p>
        </div>
        <Link href={"/"}>
          <button className="btn btn-outline text-orange-500 rounded-sm flex justify-center hover:bg-orange-600 hover:text-white">
            <FaHome style={{ marginRight: "8px" }} /> Back to Home
          </button>
        </Link>
      </header>

      {/* Search + Filter */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        tag={tag}
        setTag={setTag}
        allTags={allTags}
      />

      {/* Blog List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="text-gray-500">No posts found.</div>
        ) : (
          filtered.map((p) => <BlogCard key={p._id} post={p} />)
        )}
      </section>
    </main>
  );
}
