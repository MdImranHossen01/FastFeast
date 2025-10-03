"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BlogCard({ blog }) {
  const {
    _id,
    coverImage,
    title,
    excerpt,
    tags,
    author,
    authorEmail,
    authorPhoto,
    publishDate,
  } = blog;

  return (
    <Link
      href={`/blogs/${_id}`}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-white/30 bg-white/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:shadow-xl"
    >
      {/* Cover image */}
      <figure className="relative h-52 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </figure>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {tags?.slice(0, 1).map((tag, index) => (
            <span
              key={index}
              className="inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title + Excerpt */}
        <div className="flex-1">
          <h3 className="h-20 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-700">{excerpt}</p>
        </div>

        {/* Footer: Author + Date + Read more */}
        <div className="mt-6 flex items-center justify-between border-t border-white/50 pt-4">
          {/* Author Info */}
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <img
              src={authorPhoto || "/default-avatar.png"}
              alt={author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium">{author || "Unknown"}</span>
              <span className="text-gray-500 text-[11px]">{authorEmail}</span>
            </div>
          </div>

          {/* Date + Read More */}
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-600">
              {publishDate &&
                new Date(publishDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold transition-colors duration-300 text-gray-500 group-hover:text-orange-500">
              Read More
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
