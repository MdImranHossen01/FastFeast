"use client";
import React, { useState } from "react";
import RestaurantsCard from "./restaurantsCard";

export default function Restaurant({ restaurants }) {
  const [search, setSearch] = useState("");
  const [selectCuisine, setSelectCuisine] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // convert min to number
  const foodDelivery = (timeStr) => {
    const firstNumber = Number(timeStr.split("-")[0]);
    return isNaN(firstNumber) ? Infinity : firstNumber;
  };

  // all cuisine
  const allCuisine = [
    ...new Set(restaurants.flatMap((restaurant) => restaurant.cuisines)),
  ];

  // search
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

  // sort by price range

  // calculate average price
  const averagePrice = (menu) => {
    if (!menu || menu.length === 0) return 0;
    const total = menu.reduce((sum, item) => sum + item.price, 0);
    return total / menu.length;
  };

  const priceRangeCategory = (price) => {
    if (price > 500) return "High";
    if (price > 300) return "Medium";
    return "Low";
  };
  if (priceRange) {
    filteredRestaurants = filteredRestaurants.filter((restaurant) => {
      const avgPrice = averagePrice(restaurant.menu);
      return priceRangeCategory(avgPrice) === priceRange;
    });
  }
  return (
    <div>
      <div className="flex flex-col sm:justify-between sm:flex-row py-5 gap-5">
        <div className="flex  gap-5">
          {/* search */}
          <input
            type="text"
            placeholder="Search Restaurant"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white  input input-bordered shadow-xs p-2     rounded   lg:w-[170px]  "
          />
          {/*sort cuisine  */}
          <select
            value={selectCuisine}
            onChange={(e) => setSelectCuisine(e.target.value)}
            className="select bg-white select-bordered  p-2    rounded   lg:w-[155px]  text-gray-500 shadow-xs cursor-pointer"
          >
            <option className="bg-white" value="">
              All Cuisines
            </option>
            {allCuisine.map((cuisine, i) => (
              <option
                key={i}
                value={cuisine}
                className="text-gray-700 bg-white"
              >
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-5 ">
          {/* sort by delivery price */}
          <select
            value={deliveryPrice}
            onChange={(e) => setDeliveryPrice(e.target.value)}
            className="select select-bordered bg-white rounded cursor-pointer  lg:w-[155px]  text-gray-500 shadow-xs"
          >
            <option value="" className="text-gray-700 bg-white">
              Delivery Fee
            </option>
            <option className="text-gray-700 bg-white" value="Highest">
              Highest Delivery Fee
            </option>
            <option className="text-gray-700 bg-white" value="Lowest">
              Lowest Delivery Fee
            </option>
          </select>

          {/* sort by delivery time */}
          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="select select-bordered rounded bg-white lg:w-[155px] cursor-pointer  text-gray-500 shadow-xs"
          >
            <option value="" className="text-gray-700 bg-white">
              Delivery Time
            </option>
            <option className="text-gray-700 bg-white" value="Fastest">
              Fastest Delivery
            </option>
            <option className=" text-gray-700 bg-white" value="Slowest">
              Slowest Delivery
            </option>
          </select>
          {/* sort by price range */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="select select-bordered  bg-white    rounded  lg:w-[155px] cursor-pointer  text-gray-500 shadow-xs"
          >
            <option className="text-gray-700 bg-white" value="">
              Price Range
            </option>
            <option className="text-gray-700 bg-white" value="High">
              High
            </option>
            <option className="text-gray-700 bg-white" value="Medium">
              Medium
            </option>
            <option className="text-gray-700 bg-white" value="Low">
              Low
            </option>
          </select>
        </div>
      </div>
      {/* restaurants card */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  justify-items-center">
        {filteredRestaurants.length === 0 ? (
          <div className="text-gray-500">No posts found.</div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantsCard key={restaurant._id} restaurant={restaurant} />
          ))
        )}
      </section>
    </div>
  );
}
