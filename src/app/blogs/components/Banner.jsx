"use client";

import Image from "next/image";
import bannerImage from "../../../assets/blog-page-banner.png";
import SearchBar from "./SearchBar";

export default function Banner({ blogs, query, setQuery, tag, setTag }) {
  const allTags = ["All", ...new Set(blogs.flatMap((p) => p.tags || []))];

  return (
    <header className="mb-12 relative bg-cover bg-center min-h-80 h-120 overflow-hidden">
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
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-full p-8">
        <div className="ml-8">
          <h1 className="text-5xl uppercase text-shadow-accent-content font-extrabold py-2 bg-gradient-to-r from-red-700 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            FastFeast Food Journal – Tradition Meets Delivery
          </h1>
          <p className="text-gray-100 max-w-2xl mb-4">
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
