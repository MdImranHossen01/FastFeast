"use client";
import Image from "next/image";
import React, { useState } from "react";

const Banner = () => {
  const [thana, setThana] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query, "in", thana);
    // 👉 You can call your API or filter logic here
  };

  return (
    <div className="relative w-full h-[350px]">
      {/* Banner Image */}
      <Image
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0"
        alt="Restaurant"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 px-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl bg-white p-3 rounded-xl shadow-md">
          {/* Dropdown for Thana */}
          <select
            value={thana}
            onChange={(e) => setThana(e.target.value)}
            className="w-full sm:w-1/3 px-3 py-2 border rounded-md outline-none"
          >
            <option value="">Select Location</option>
            <option value="dhanmondi">Dhanmondi</option>
            <option value="mirpur">Mirpur</option>
            <option value="uttara">Uttara</option>
            <option value="banani">Banani</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search menu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md outline-none"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
