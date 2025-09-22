"use client";
import { useEffect, useState } from "react";
import BlogCard from "./components/BlogCard";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

const metadata = {
  title: "FastFeast Food Journal – Tradition Meets Delivery",
  description:
    "Read about Bangladeshi cultural foods, modern delivery trends, and tasty tips for foodies across the nation.",
};

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

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
    <main className="container mx-auto px-4 pb-8 pt-28 space-y-6">
      <header className="mb-6 flex justify-between items-center space-y-6">
        <div>
          <h1 className="text-4xl font-extrabold py-5 bg-gradient-to-r from-red-700 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            {metadata.title}
          </h1>
          <p className="text-gray-600">
            {metadata.description}. Latest tips, rider guides and food ordering
            news.
          </p>
        </div>
        <Link href={"/"}>
          <button className="btn btn-outline text-orange-500 rounded-sm flex justify-center hover:bg-orange-600 hover:text-white">
            <FaHome style={{ marginRight: "8px" }} /> Back to Home
          </button>
        </Link>
      </header>

      <section className="flex gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <select
          className="select select-bordered"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          {allTags.map((t, index) => (
            <option key={`${t}-${index}`} value={t}>
              {t}
            </option>
          ))}
        </select>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-gray-500">Loading posts...</div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-500">No posts found.</div>
        ) : (
          filtered.map((p) => <BlogCard key={p._id} post={p} />)
        )}
      </section>
    </main>
  );
}
