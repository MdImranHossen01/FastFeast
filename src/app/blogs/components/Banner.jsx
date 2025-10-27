"use client";

import Image from "next/image";
import bannerImage from "../../../assets/blog-page-banner.png";
import SearchBar from "./SearchBar";

export default function Banner({ blogs, query, setQuery, tag, setTag }) {
  const allTags = ["All", ...new Set(blogs.flatMap((b) => b.tags || []))];

  return (
    <header className="mb-12 relative bg-cover bg-center min-h-80 h-auto overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={bannerImage}
          alt="FastFeast Blog Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-xl sm:text-4xl lg:text-5xl uppercase text-shadow-accent-content font-extrabold py-2 bg-gradient-to-r from-red-700 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            FastFeast Food Journal – Tradition Meets Delivery
          </h1>

          <p className="text-gray-100 mb-6 text-sm sm:text-base md:text-lg">
            Read about Bangladeshi cultural foods, modern delivery trends, and
            tasty tips for foodies across the nation.
          </p>

          {/* Search bar */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            tag={tag}
            setTag={setTag}
            allTags={allTags}
          />
        </div>
      </div>
    </header>
  );
}
