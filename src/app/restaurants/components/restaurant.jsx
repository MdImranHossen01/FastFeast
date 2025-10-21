"use client";
import React, { useEffect, useState } from "react";
import RestaurantsCard from "./restaurantsCard";
import banner from "../../../assets/restaurantsPage/abendbrot-939435.jpg";
import Image from "next/image";

export default function Restaurant({ restaurants }) {
  const [search, setSearch] = useState("");
  const [selectCuisine, setSelectCuisine] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [userLocation, setUserLocation] = useState(null);

  // convert min to number
  const foodDelivery = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string") return Infinity;
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
  if (deliveryPrice === "lowest") {
    filteredRestaurants = [...filteredRestaurants].sort(
      (a, b) => a.deliveryFee - b.deliveryFee
    );
  } else if (deliveryPrice === "topRating") {
    filteredRestaurants = [...filteredRestaurants].sort(
      (a, b) => b.rating - a.rating
    );
  }

  // sort by delivery time
  if (deliveryTime === "30min") {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => foodDelivery(restaurant.estimatedDeliveryTime) <= 30
    );
  } else if (deliveryTime === "45min") {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => foodDelivery(restaurant.estimatedDeliveryTime) <= 45
    );
  } else if (deliveryTime === "any") {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => foodDelivery(restaurant.estimatedDeliveryTime) > 45
    );
  }
  // // scroll detection
  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 200);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      (err) => {
        console.error("Location access denied,using fallback", err);
        // fallback Dhaka
        setUserLocation({ lat: 23.8103, lng: 90.4125 });
      };
    });
  }, []);

  // coordinate latitude-longitude
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    // angular distance
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

    // central angle
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // sort by distance
  if (deliveryPrice === "distance" && userLocation) {
    filteredRestaurants = [...filteredRestaurants].sort((a, b) => {
      const distanceA = getDistance(
        userLocation.lat,
        userLocation.lng,
        a.location.coordinates.lat,
        a.location.coordinates.lng
      );
      const distanceB = getDistance(
        userLocation.lat,
        userLocation.lng,
        b.location.coordinates.lat,
        b.location.coordinates.lng
      );
      return distanceA - distanceB;
    });
  }

  return (
    <div>
      <header className="mb-12 relative bg-cover h-120 bg-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={banner}
            alt="fastFeast restaurants banner"
            fill
            className="object-cover bg-black/50"
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10  px-4">
          {/* title */}
          <div className="max-w-5xl text-center ">
            <h3 className="text-3xl sm:text-5xl  uppercase  font-extrabold text-center bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent pt-5">
              Restaurant Listings
            </h3>
            <p className="mx-auto text-center text-gray-100 pb-3 sm:pb-5 text-lg pt-1 sm:pt-3 mb-4 m-3">
              Discover our trusted partner restaurants offering a wide variety
              of cuisines. Choose your favorite place and order delicious meals
              delivered right to your doorstep.
            </p>
          </div>
          {/* search */}

          <div
            className={`w-full  max-w-3xl bg-orange-500/30 shadow-lg z-10 border border-orange-500/30 rounded-full px-4   
              `}
          >
            <input
              type="text"
              placeholder="Search Restaurant"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white   shadow-xs p-4 outline-none  w-full placeholder:text-white"
            />
          </div>
        </div>
      </header>

      {/* sort cuisine,delivery time and others */}
      <div className="container mx-auto ">
        <div className="flex  mr-3   sm:justify-end sm:flex-row py-5 gap-5 overflow-x-auto scrollbar-hide sm:overflow-visible">
          {/*sort cuisine  */}
          <select
            value={selectCuisine}
            onChange={(e) => setSelectCuisine(e.target.value)}
            className="select bg-white select-bordered  p-2    rounded   min-w-[130px] md:w-[150px]  text-gray-500 shadow-xs cursor-pointer"
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

          {/* sort by delivery price */}
          <select
            value={deliveryPrice}
            onChange={(e) => setDeliveryPrice(e.target.value)}
            className="select select-bordered bg-white rounded cursor-pointer  min-w-[130px] md:w-[150px] text-gray-500 shadow-xs"
          >
            <option value="" className="text-gray-700 bg-white">
              Sort By
            </option>
            <option className="text-gray-700 bg-white" value="lowest">
              Delivery Fee
            </option>
            <option className="text-gray-700 bg-white" value="topRating">
              Top Rating
            </option>
            <option className="text-gray-700 bg-white" value="distance">
              Nearest
            </option>
          </select>

          {/* sort by delivery time */}
          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="select select-bordered rounded bg-white min-w-[130px] md:w-[150px] cursor-pointer  text-gray-500 shadow-xs"
          >
            <option value="" className="text-gray-700 bg-white">
              Delivery Time
            </option>
            <option className="text-gray-700 bg-white" value="30min">
              Within 30 min
            </option>
            <option className="text-gray-700 bg-white" value="45min">
              Within 45 min
            </option>
            <option className=" text-gray-700 bg-white" value="any">
              Any time
            </option>
          </select>
        </div>
      </div>
      {/* restaurants card */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  justify-items-center">
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
