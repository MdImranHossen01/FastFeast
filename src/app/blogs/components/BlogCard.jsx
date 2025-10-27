"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      await fetch(`/api/blogs/${_id}`, { method: "POST" });
      router.push(`/blogs/${_id}`);
    } catch (error) {
      console.error("Failed to increment view count:", error);
      router.push(`/blogs/${_id}`);
    }
  };

  return (
    <article
      onClick={handleReadMore}
      className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 ease-out"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden rounded-t-3xl">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10"></div>

        {/* Floating Tag */}
        {tags?.length > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-400 text-white px-3 py-1 text-xs font-semibold shadow-md shadow-orange-400/30 z-20">
            {tags[0]}
          </span>
        )}

        {/* ✅ View Count - fixed visibility */}
        <div className="absolute bottom-4 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white shadow-md z-30">
          <FaEye className="w-4 h-4 text-orange-400" />
          <span>{visitCount ?? 0}</span>
        </div>
      </div>



      {/* Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-5">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-5 leading-relaxed">
          {excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 gap-2">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <Image
              src={"/user.png"}
              alt={author || "Author"}
              width={32}
              height={32}
              className="rounded-full border border-gray-300 object-cover"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-700 text-sm leading-tight">
                {author || "Unknown"}
              </p>
              {createdAt && (
                <p className="text-[11px] text-gray-400">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-3"></div>

        {/* Read More Button */}
        <div className="flex justify-end">
          <Link
            href={`/blogs/${_id}`}
            className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-all duration-300 group"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
