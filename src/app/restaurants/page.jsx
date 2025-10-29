import React from "react";

// import { restaurants } from "./restaurants";
import Restaurant from "./components/restaurant";
import getRestaurants from "../actions/restaurants/getRestaurant";

export default async function RestaurantsListing() {
  const restaurantsData = await getRestaurants();

  const restaurants = restaurantsData.filter((restaurant) => {
    return restaurant.status === "approved";
  });


  return (
    <div className=" ">
      <div className="mt-18 mb-5  px-4  ">
        {/* restaurant  */}
        <div>
          <Restaurant restaurants={restaurants} />
        </div>
      </div>
    </div>
  );
}
