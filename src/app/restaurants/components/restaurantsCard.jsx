"use client";
import React from "react";
import {
  FaArrowRight,
  FaMotorcycle,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa";

export default function RestaurantsCard({ restaurant }) {
  // console.log(restaurant[2]);
  // rating
  const rendersStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-200" />);
    }
    return stars;
  };
  return (
    <div className="card  group bg-white shadow-md hover:shadow-lg hover:-translate-y-1   transition-transform  transition-shadow duration-300 cursor-pointer">
      {/* banner */}
      <figure>
        <img
          className="h-60 w-[400px] object-cover hover:scale-110 transition-transform duration-300"
          src={restaurant.banner}
          alt="restaurant"
        />
      </figure>
      <div className="card-body space-y-1">
        <div className="flex justify-between items-end ">
          {/* logo+name */}
          <div className="flex items-center  gap-2">
            <img
              className="w-12 h-12 rounded-full object-cover  "
              src={restaurant.logo}
              alt=""
            />
            <h2 className="card-title group-hover:text-orange-500 text-gray-700">
              {restaurant.name}
            </h2>
          </div>

          {/* rating+reviews */}
          <div>
            <div className="flex items-center gap-1 text-gray-700">
              {rendersStars(restaurant.rating)}
              <span className="font-semibold">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-end text-gray-500">
              ({restaurant.reviewsCount}+reviews)
            </p>
          </div>
        </div>

        {/* cuisine */}
        <div className="flex justify-between items-center mt-2">
          {/* cuisine */}
          <div>
            {restaurant.cuisines.map((cuisine, i) => (
              <div
                key={i}
                className="badge bg-white text-gray-700 px-2 mr-2  border border-gray-300 "
              >
                {cuisine}
              </div>
            ))}
          </div>
        </div>
        {/* delivery fee+delivery time */}
        <div className="flex text-gray-500 gap-3">
          {/* delivery time */}
          <div className="flex items-center    gap-2">
            <FaRegClock className="text-lg" />
            <span>{restaurant.estimatedDeliveryTime} </span>
          </div>
          <span> | </span>
          <div>
            <p className="flex items-center gap-1">
              <FaMotorcycle className="text-lg" /> {restaurant.deliveryFee}
              <TbCurrencyTaka />
            </p>
          </div>
        </div>

        {/* view menu button */}
        <div className="card-actions justify-end">
          <button className="flex transition-transform duration-300  group-hover:translate-x-1 text-orange-500 items-center gap-1 hover:border-b-2 hover:border-orange-500   hover:translate-x-0.5   ">
            View Menu{" "}
            <FaArrowRight className="transition-transform duration-300  group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
