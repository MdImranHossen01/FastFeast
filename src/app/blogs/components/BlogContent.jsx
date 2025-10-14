"use client";

import BlogCard from "./BlogCard";

export default function BlogContent({ blogs, query, tag }) {
  // Filter blogs based on query and tag
  const filtered = blogs.filter((b) => {
    const matchTag = tag === "All" ? true : b.tags?.includes(tag);
    const matchQuery =
      query.trim() === ""
        ? true
        : b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQuery;
  });

  return (
    <main className="pb-8 lg:mx-14 md:mx-8 mx-4 space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="text-gray-500">No posts found.</div>
        ) : (
          filtered.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </section>
    </main>
  );
}
