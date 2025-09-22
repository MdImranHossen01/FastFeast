import React from "react";
import RestaurantsCard from "./components/restaurantsCard";
import { restaurants } from "./restaurants";

export default function RestaurantsListing() {
  return (
    <div className="mt-20 mb-5 container mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurants.length === 0 ? (
          <div className="text-gray-500">No posts found.</div>
        ) : (
          restaurants.map((restaurant) => (
            <RestaurantsCard key={restaurant.id} restaurant={restaurant} />
          ))
        )}
      </section>
    </div>
  );
}
