import getMenu from "@/app/actions/restaurant/getRestaurant";
import React from "react";
import { generateSlug } from "../components/generateSlug";

export default async function RestaurantDetails({ params }) {
  const { slug } = await params;
  const restaurants = await getMenu();
  console.log(restaurants);

  //   find individual restaurant
  const restaurant = restaurants.find(
    (restaurant) =>
      generateSlug(restaurant.name, restaurant.location?.area) === slug
  );
  console.log(restaurant);

  return <div>RestaurantDetails</div>;
}
