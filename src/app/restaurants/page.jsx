"use client";
import React, { useState } from "react";
import RestaurantsCard from "./components/restaurantsCard";
import { restaurants } from "./restaurants";

export default function RestaurantsListing() {
  const [search, setSearch] = useState("");
  const [selectCuisine, setSelectCuisine] = useState("");

  // all cuisine
  const allCuisine = [
    ...new Set(restaurants.flatMap((restaurant) => restaurant.cuisines)),
  ];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLocaleLowerCase()
      .includes(search.trim().toLocaleLowerCase());

    const matchesCuisine =
      selectCuisine === "" || restaurant.cuisines.includes(selectCuisine);
    return matchesSearch && matchesCuisine;
  });
  return (
    <div className="mt-20 mb-5 container mx-auto px-4">
      <div className="flex gap-5">
        {/* search */}
        <input
          type="text"
          placeholder="Search Restaurant"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="  input input-bordered shadow-xs p-2 mb-5 rounded  max-w-md  w-full"
        />
        {/*sort cuisine  */}
        <select
          value={selectCuisine}
          onChange={(e) => setSelectCuisine(e.target.value)}
          className="select select-bordered  p-2 mb-5 rounded max-w-md w-full text-gray-500 shadow-xs"
        >
          <option value="" className="text-gray-700">
            All Cuisines
          </option>
          {allCuisine.map((cuisine, i) => (
            <option key={i} value={cuisine} className="text-gray-700">
              {cuisine}
            </option>
          ))}
        </select>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  justify-items-center">
        {filteredRestaurants.length === 0 ? (
          <div className="text-gray-500">No posts found.</div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantsCard key={restaurant.id} restaurant={restaurant} />
          ))
        )}
      </section>
    </div>
  );
}
