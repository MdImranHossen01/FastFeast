import React from "react";

export default function RestaurantsCard({ restaurant }) {
  // console.log(restaurant[2]);
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
          <h2 className="card-title">{restaurant.name}</h2>

          <div className="card-actions justify-end">
            <button className="btn  ">View Menu</button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
