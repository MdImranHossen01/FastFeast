"use client";
import React, { useState } from "react";
import RestaurantsCard from "./components/restaurantsCard";
import { restaurants } from "./restaurants";

export default function RestaurantsListing() {
  const [search, setSearch] = useState("");
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name
      .toLocaleLowerCase()
      .includes(search.trim().toLocaleLowerCase())
  );
  return (
    <div className="mt-20 mb-5 container mx-auto px-4">
      {/* search */}
      <input
        type="text"
        placeholder="Search Restaurant"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border   p-2 mb-5 rounded  max-w-md  w-full"
      />
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
