"use client";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setLocation } from "@/lib/features/filtersSlice";

const Banner = () => {
  // Connect to Redux
  const dispatch = useDispatch();
  const { searchQuery, location } = useSelector((state) => state.filters);

  return (
    <div className="relative h-[200px] w-full">
      {/* Banner Image */}
      <Image
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0"
        alt="Restaurant"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4">
        <div className="flex w-full max-w-3xl flex-col gap-3 rounded-xl bg-white p-3 shadow-md sm:flex-row">
          {/* Dropdown for Location */}
          <select
            value={location}
            onChange={(e) => dispatch(setLocation(e.target.value))} // Dispatch action on change
            className="w-full rounded-md border px-3 py-2 outline-none sm:w-1/3"
          >
            <option value="">Select Location</option>
            <option value="Dhanmondi">Dhanmondi</option>
            <option value="Mirpur">Mirpur</option>
            <option value="Uttara">Uttara</option>
            <option value="Banani">Banani</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))} // Dispatch action on change
            className="flex-1 rounded-md border px-3 py-2 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;