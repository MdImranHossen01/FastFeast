"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function BlogCard({ blog }) {
  const router = useRouter();
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
    visitCount,
  } = blog;

  const handleReadMore = async (e) => {
    e.preventDefault();

    try {
      // increment visit count before navigating
      await fetch(`/api/blogs/${_id}`, {
        method: "POST", // use POST here, since you already made a POST route for increment
      });

      router.push(`/blogs/${_id}`);
    } catch (error) {
      console.error("Failed to increment view count:", error);
      router.push(`/blogs/${_id}`);
    }
  };

  return (
    <section
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

        {/* Blog Title */}
        <h1 className="text-xl font-extrabold mb-3 line-clamp-2 text-gray-900">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Image
              src={authorPhoto || "/user.png"}
              alt={author || "Author"}
              width={32}
              height={32}
              className="rounded-full border border-gray-200 object-cover"
            />
           <div className="flex flex-col">
             <span className="font-semibold text-xs">{author || "Unknown"}</span>
            {/* Date */}
          {publishDate && (
            <span className="text-xs ">
              {new Date(publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
           </div>
          </div>

         <div className="flex gap-1 justify-center">
          {/* <span className="text-gray-400">•</span> */}

          {/* 👁️ View Count */}
          <span className="flex  items-center  gap-1 text-gray-600">
          <FaEye className="w-4 h-4"/> {visitCount || 0} views
          </span>
         </div>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-gray-700 line-clamp-2 mb-4">{excerpt}</p>

        <hr className="border-orange-200 mb-3" />

        {/* Footer: Read More */}
        <div className="flex flex-1 items-center justify-end">
          <span
            className="flex items-center gap-1 text-sm font-semibold cursor-pointer text-gray-500 transition-colors duration-300 group-hover:text-orange-500"
            onClick={handleReadMore}
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </section>
  );
}

