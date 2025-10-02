"use client"
import React, { useState } from 'react'
import SearchBar from './SearchBar';
import bannerImage from "../../../assets/blog-page-banner.png";
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import Image from 'next/image';





export const metadata = {
  title: "FastFeast Food Journal – Tradition Meets Delivery",
  description:
    "Read about Bangladeshi cultural foods, modern delivery trends, and tasty tips for foodies across the nation.",
};
export default function Banner({blogs}) {
    const [query, setQuery] = useState("");
      const [tag, setTag] = useState("All");

      const allTags = ["All", ...new Set(blogs.flatMap((p) => p.tags || []))];

  const filtered = blogs.filter((p) => {
    const matchTag = tag === "All" ? true : p.tags?.includes(tag);
    const matchQuery =
      query.trim() === ""
        ? true
        : p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQuery;
  });

  return (
    <header 
      data-aos="fade-right"
      className="mb-6 relative bg-cover bg-center bg-no-repeat min-h-80 h-120 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="FastFeast Blog Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-full p-8">
          <div>
            <h1 className="text-4xl font-extrabold py-2 bg-gradient-to-r from-red-700 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              FastFeast Food Journal – Tradition Meets Delivery
            </h1>
            <p className="text-gray-100 max-w-2xl mb-4">
              Read about Bangladeshi cultural foods, modern delivery trends, and
              tasty tips for foodies across the nation. Latest tips, rider
              guides and food ordering news.
            </p>

            <SearchBar
                query={query}
                setQuery={setQuery}
                tag={tag}
                setTag={setTag}
                allTags={allTags}
              />
          </div>

          
          

              <Link href={"/"}>
            <button className="mt-4 md:mt-0 px-5 py-2 border border-orange-500 text-orange-500 rounded-sm flex items-center hover:bg-orange-600 hover:text-white transition">
              <FaHome className="mr-2" /> Back to Home
            </button>
          </Link>
        </div>

        
      </header>
  )
}
