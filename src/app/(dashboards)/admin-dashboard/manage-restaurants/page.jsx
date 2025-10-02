import React from "react";
import PendingRestaurants from "./components/pendingRestaurants";
import ApprovedRestaurants from "./components/approvedRestaurants";
import ManageRestaurantsCard from "./components/manageRestaurantsCard";

export default async function ManageRestaurants() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/restaurant`
    // {
    //   next: {
    //     revalidate: 10,
    //   },
    // }
  );
  const restaurants = await res.json();
  return (
    <div className="pb-5 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 min-h-screen px-6">
      <ManageRestaurantsCard restaurants={restaurants} />
    </div>
  );
}
