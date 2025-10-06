"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function ManageReviewHeader() {
  const [search, setSearch] = useState("All-reviews");
  const [ratings, setRatings] = useState("All-ratings");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const searchQuery = { search, ratings };
    const urlQueryParam = new URLSearchParams(searchQuery);
    const url = `${pathname}?${urlQueryParam}`;
    router.push(url);
  }, [search, pathname, router]);

  return (
    <div className="flex justify-between py-8 gap-4 flex-col md:flex-row">
      {/* ✅ Text color supports light & dark */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Manage Reviews
      </h1>

      <div className="flex-1 flex justify-between sm:justify-end gap-5">
        {/* Star ratings */}
        <select
          
          defaultValue="All ratings"
          className="
            select appearance-none max-w-3xs w-full 
            bg-gray-100 text-gray-800 border border-gray-300
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option disabled={true}>Select an Option</option>
          <option value={"All-ratings"}>All ratings</option>
          <option value={1}>01</option>
          <option value={2}>02</option>
          <option value={3}>03</option>
          <option value={4}>04</option>
          <option value={5}>05</option>
        </select>

        {/* Review category */}
        <select
          onChange={(e) => setSearch(e.target.value)}
          defaultValue="All reviews"
          className="
            select appearance-none max-w-3xs w-full *:max-w-3xs
            bg-gray-100 text-gray-800 border border-gray-300
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option disabled={true}>Select an Option</option>
          <option value={"All-reviews"}>All reviews</option>
          <option value={"Rider"}>Riders</option>
          <option value={"Restaurant"}>Restaurants</option>
          <option value={"Food"}>Foods</option>
        </select>
      </div>
    </div>
  );
}
