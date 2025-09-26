"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BlogCard({ blog }) {
  const { _id, coverImage, title, excerpt, tags, author, date } = blog;

  return (
    <Link
      href={`/blogs/${_id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:shadow-xl"
    >
      <figure className="relative h-52 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </figure>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {tags?.slice(0, 1).map((tag, index) => (
            <span key={index} className="inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-700">
            {excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/50 pt-4">
          <div className="text-xs text-gray-700">
            {author} · {new Date(date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold transition-opacity duration-300 text-gray-500 group-hover:text-orange-500">
              Read More
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    
    </Link>
  );
}