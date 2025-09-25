import React from "react";

import { restaurants } from "./restaurants";
import Restaurant from "./components/restaurant";

export default function RestaurantsListing() {
  return (
    <div className="bg-gray-50">
      <div className="mt-18 mb-5 container mx-auto">
        {/* restaurant  */}
        <div>
          <Restaurant restaurants={restaurants} />
        </div>
      </div>
    </div>
  );
}
