"use client";

import React, { useState } from "react";
import RestaurantsCard from "./components/restaurantsCard";
import { restaurants } from "./restaurants";

export default function RestaurantsListing() {
  const [search, setSearch] = useState("");
  const [selectCuisine, setSelectCuisine] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  // convert min to number
  const foodDelivery = (timeStr) => {
    const firstNumber = Number(timeStr.split("-")[0]);
    return isNaN(firstNumber) ? Infinity : firstNumber;
  };

  // all cuisine
  const allCuisine = [
    ...new Set(restaurants.flatMap((restaurant) => restaurant.cuisines)),
  ];

  let filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLocaleLowerCase()
      .includes(search.trim().toLocaleLowerCase());

    const matchesCuisine =
      selectCuisine === "" || restaurant.cuisines.includes(selectCuisine);
    return matchesSearch && matchesCuisine;
  });

  // sort by delivery price
  if (deliveryPrice === "Highest") {
    filteredRestaurants = [...filteredRestaurants].sort(
      (a, b) => b.deliveryFee - a.deliveryFee
    );
  } else if (deliveryPrice === "Lowest") {
    filteredRestaurants = [...filteredRestaurants].sort(
      (a, b) => a.deliveryFee - b.deliveryFee
    );
  }

  // sort by delivery time
  if (deliveryTime === "Fastest") {
    filteredRestaurants = [...filteredRestaurants].sort(
      (a, b) =>
        foodDelivery(a.estimatedDeliveryTime) -
        foodDelivery(b.estimatedDeliveryTime)
    );
  } else if (deliveryTime === "Slowest") {
    filteredRestaurants = [...filteredRestaurants].sort(
      (a, b) =>
        foodDelivery(b.estimatedDeliveryTime) -
        foodDelivery(a.estimatedDeliveryTime)
    );
  }

  return (
    <div className="mt-20 mb-5 container mx-auto px-4">
      <div className="flex flex-col sm:justify-between sm:flex-row gap-5">
        <div className="flex gap-5">
          {/* search */}
          <input
            type="text"
            placeholder="Search Restaurant"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="  input input-bordered shadow-xs p-2 mb-0 sm:mb-5 rounded  max-w-md   "
          />
          {/*sort cuisine  */}
          <select
            value={selectCuisine}
            onChange={(e) => setSelectCuisine(e.target.value)}
            className="select select-bordered  p-2 mb-0 sm:mb-5  rounded max-w-md   text-gray-500 shadow-xs"
          >
            <option value="">All Cuisines</option>
            {allCuisine.map((cuisine, i) => (
              <option key={i} value={cuisine} className="text-gray-700">
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-5 mb-5">
          {/* sort by delivery price */}
          <select
            value={deliveryPrice}
            onChange={(e) => setDeliveryPrice(e.target.value)}
            className="select select-bordered rounded max-w-m  text-gray-500 shadow-xs"
          >
            <option value="" className="text-gray-700">
              Sort by delivery Fee
            </option>
            <option className="text-gray-700" value="Highest">
              Highest Delivery Fee
            </option>
            <option className="text-gray-700" value="Lowest">
              Lowest Delivery Fee
            </option>
          </select>

          {/* sort by delivery time */}
          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="select select-bordered rounded max-w-m  text-gray-500 shadow-xs"
          >
            <option value="" className="text-gray-700">
              Sort by delivery Time
            </option>
            <option className="text-gray-700" value="Fastest">
              Fastest Delivery
            </option>
            <option className="text-gray-700" value="Slowest">
              Slowest Delivery
            </option>
          </select>
        </div>
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
