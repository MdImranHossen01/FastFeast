import React from "react";

import { restaurants } from "./restaurants";
import Restaurant from "./components/restaurant";

export default function RestaurantsListing() {
  return (
    <div className=" ">
      <div className="mt-18 mb-5 container mx-auto px-4  ">
        <h3 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent pt-5">
          Restaurant Listings
        </h3>
        <p className="mx-auto text-center text-gray-500 pb-3 sm:pb-5 max-w-3xl pt-1 sm:pt-3">
          Discover our trusted partner restaurants offering a wide variety of
          cuisines. Choose your favorite place and order delicious meals
          delivered right to your doorstep.
        </p>
        {/* restaurant  */}
        <div>
          <Restaurant restaurants={restaurants} />
        </div>
      </div>
    </div>
  );
}
