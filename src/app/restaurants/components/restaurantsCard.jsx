import React from "react";
import { FaArrowRight, FaStar, FaStarHalfAlt } from "react-icons/fa";

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
    <div className=" ">
      <div className="card bg-base-100  shadow-sm">
        <figure>
          <img
            className="h-60 w-full object-cover "
            src={restaurant.banner}
            alt="restaurant"
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between items-end ">
            {/* logo+name */}
            <div className="flex items-center  gap-2">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={restaurant.logo}
                alt=""
              />
              <h2 className="card-title">{restaurant.name}</h2>
            </div>

            {/* rating+reviews */}
            <div>
              <div className="flex items-center gap-2">
                {rendersStars(restaurant.rating)}
                <span>{restaurant.rating.toFixed(1)}</span>
              </div>
              <p className="text-xs text-end text-gray-500">
                {restaurant.reviewsCount}+reviews
              </p>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button className="flex items-center gap-2 hover:border-b transition duration-300 ">
              View Menu <FaArrowRight />
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
