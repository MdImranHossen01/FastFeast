import React from "react";

import { restaurants } from "./restaurants";
import Restaurant from "./components/restaurant";

export default function RestaurantsListing() {
  return (
    <div className="mt-20 mb-5 container mx-auto px-4">
      {/* restaurant  */}
      <div>
        <Restaurant restaurants={restaurants} />
      </div>
    </div>
  );
}
