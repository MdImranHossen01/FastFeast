"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaBookOpen } from "react-icons/fa";

export default function BlogCard({ post }) {
  return (
    <article className="lg:min-h-[420px] flex flex-col h-full bg-base-200 hover:bg-white shadow-md border border-slate-100 p-2">
      <figure className="h-60 overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover hover:scale-120 transition-transform" />
      </figure>

      <div className="flex flex-col flex-grow card-body">
        <h3 className="card-title text-lg">{post.title}</h3>
        <p className="text-sm text-gray-700">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {post?.tags?.map((tag, index) => (
            <span key={index} className="badge badge-outline">{tag}</span>
          ))}
        </div>

        {/* Footer pinned at bottom */}
        <div className="mt-auto flex justify-between items-center pt-4">
          <div className="text-xs text-gray-500">
            {post.author} · {post.date}
          </div>
          <Link
            href={`/blogs/${post.slug}`}
            className="group inline-flex items-center gap-1 px-4 text-orange-500 transition hover:border-b-2 hover:border-orange-500"
          >
            Read More
            <ArrowRight
              className="w-4 h-4 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 text-orange-500"
            />
          </Link>
        </div>
      </div>
    </article>

  );
}
