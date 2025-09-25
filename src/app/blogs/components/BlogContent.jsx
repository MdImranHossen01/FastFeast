"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import SearchBar from "./SearchBar";

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
    <main className="pb-8 space-y-6">
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
