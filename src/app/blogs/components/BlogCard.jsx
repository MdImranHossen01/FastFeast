"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard({ blog }) {
  console.log(blog)
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
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Cover image */}
      <figure className="relative h-52 overflow-hidden">
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </figure>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tag */}
        {tags?.length > 0 && (
          <span className="mb-3 inline-block w-fit rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            {tags[0]}
          </span>
        )}

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600 line-clamp-2">
          {title}
        </h3>

        {/* Author Info + Date */}
        <div className="mb-3 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Image
              src={authorPhoto || "/user.png"}
              alt={author || "Author"}
              width={32}
              height={32}
              className="rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-800">{author || "Unknown"}</span>
              <span className="text-gray-500 text-[11px]">{authorEmail}</span>
            </div>
          </div>

          {publishDate && (
            <span>
              {new Date(publishDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Excerpt */}
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">{excerpt}</p>

        <hr className="border-orange-200 mb-3" />

        {/* Footer: Read More */}
        <div className="flex items-center justify-end">
          <span className="flex items-center gap-1 text-sm font-semibold text-gray-500 transition-colors duration-300 group-hover:text-orange-500">
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
