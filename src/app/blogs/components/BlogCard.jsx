"use client"

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEye } from "react-icons/fa";

export default function BlogCard({ blog }) {
  const router = useRouter();
  const {
    _id,
    title,
    excerpt,
    coverImage,
    tags,
    visitCount,
    author,
    createdAt,
  } = blog;

  const handleReadMore = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/api/blogs/${_id}`, {
        method: "POST",
      });

      router.push(`/blogs/${_id}`);
    } catch (error) {
      console.error("Failed to increment view count:", error);
      router.push(`/blogs/${_id}`);
    }
  };

  return (
    <section className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Cover image with overlay */}
      <figure className="relative h-60 md:h-72 overflow-hidden">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300" />

        {/* Tag and Views on image */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
          {tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-xs font-semibold bg-orange-500/90 text-white px-3 py-1 rounded-full shadow-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* View count badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-medium shadow-md">
          <FaEye className="w-4 h-4 text-orange-500" /> {visitCount || 0}
        </div>
      </figure>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Blog Title */}
        <h1 className="text-lg md:text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Image
              src={"/user.png"}
              alt={author || "Author"}
              width={28}
              height={28}
              className="rounded-full border border-gray-200 dark:border-gray-600 object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-xs">
                {author || "Unknown"}
              </span>
              {createdAt && (
                <span className="text-xs">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
          {excerpt}
        </p>

        <hr className="border-orange-200 dark:border-gray-700 mb-3" />

        {/* Read More */}
        <div className="flex flex-1 items-center justify-end">
          <Link
            href={`/blogs/${_id}`}
            onClick={handleReadMore}
            className="flex items-center gap-1 text-sm font-semibold text-gray-500 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
