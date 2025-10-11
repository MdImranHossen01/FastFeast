import React from "react";
import { generateSlug } from "../components/generateSlug";

export default async function RestaurantDetails({ params }) {
  const { slug } = await params;

  // fetch all approved restaurants
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/restaurant?status=approved`
  );
  const restaurants = await res.json();

  //   find restaurant by slug
  const restaurant = restaurants.find(
    (restaurant) =>
      generateSlug(restaurant.name, restaurant.location?.area) === slug
  );

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  // fetch restaurant-wise menu from foods collection
  const menuRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/restaurant/${restaurant._id}`
  );

  const { menus } = await menuRes.json();

  console.log("Menus:", menus);

  console.log(restaurant);

  return (
    <div>
      {menus.map((menu) => (
        <div key={menu._id}>
          {menu.title}{" "}
          <img className="w-[300px]" src={menu.imageUrl} alt="menu" />
        </div>
      ))}
    </div>
  );
}
