import getMenu from "@/app/actions/menus/getMenus";
import getRestaurant from "@/app/actions/restaurants/getRestaurant";
import React from "react";
import { generateSlug } from "../components/generateSlug";
import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaStarHalfAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGlobe,
  FaRegClock,
  FaMotorcycle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUtensils,
  FaShippingFast,
} from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import MenuCard from "@/app/(menulayout)/menu/components/MenuCard";
import FavRestaurant from "../components/favRestaurant";

export default async function RestaurantDetails({ params }) {
  const { slug } = await params;
  const restaurants = await getRestaurant();
  const menuItems = await getMenu();

  const restaurant = restaurants.find(
    (restaurant) =>
      generateSlug(restaurant.name, restaurant.location?.area) === slug
  );

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUtensils className="text-3xl text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Restaurant Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the restaurant you're looking for.
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  const restaurantMenuItems = menuItems.filter(
    (item) => item.restaurantId === restaurant._id
  );

  const renderStars = (rating) => {
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
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const isRestaurantOpen = () => {
    const now = new Date();
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const currentDay = days[now.getDay()]; // Get current day as 'sun', 'mon', etc.
    const currentTime = now.getHours() * 100 + now.getMinutes();

    const hours = restaurant.openingHours[currentDay];
    if (!hours || !hours.open || !hours.close) return false;

    const [openHour, openMinute] = hours.open.split(":").map(Number);
    const [closeHour, closeMinute] = hours.close.split(":").map(Number);

    const openTime = openHour * 100 + openMinute;
    const closeTime = closeHour * 100 + closeMinute;

    return currentTime >= openTime && currentTime <= closeTime;
  };

  const getCurrentDay = () => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days[new Date().getDay()];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link
            href="/restaurants"
            className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
          >
            Restaurants
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 font-medium">{restaurant.name}</span>
        </nav>

        {/* Restaurant Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-64 md:h-80 lg:h-96">
            <Image
              src={restaurant.banner}
              alt={restaurant.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                {renderStars(restaurant.rating)}
                <span className="font-bold text-gray-900 ml-1">
                  {restaurant.rating.toFixed(1)}
                </span>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isRestaurantOpen()
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {isRestaurantOpen() ? "Open Now" : "Closed"}
              </div>
              <div>
                <FavRestaurant restaurant={restaurant} />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Section - Contact & Info */}
              <div className="lg:w-2/3 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={restaurant.logo}
                      alt={restaurant.name}
                      width={120}
                      height={120}
                      className="rounded-full border-orange-400 border-3 shadow-md"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {restaurant.name}
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                      {restaurant.bio}
                    </p>
                  </div>
                </div>

                {/* Cuisine Tags */}
                <div className="flex flex-wrap gap-2">
                  {restaurant.cuisines.map((cuisine, i) => (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium border border-orange-200"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>

                {/* Delivery Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaRegClock className="text-orange-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery Time</p>
                        <p className="font-semibold text-gray-900">
                          {restaurant.estimatedDeliveryTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaMotorcycle className="text-orange-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery Fee</p>
                        <p className="font-semibold text-gray-900 flex items-center">
                          {restaurant.deliveryFee}{" "}
                          <TbCurrencyTaka className="ml-1" />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaShippingFast className="text-orange-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Min Order</p>
                        <p className="font-semibold text-gray-900 flex items-center">
                          {restaurant.minOrderValue}{" "}
                          <TbCurrencyTaka className="ml-1" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-orange-500" />
                      Location
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p className="font-medium">{restaurant.location.area}</p>
                      <p className="text-sm">{restaurant.location.address}</p>
                      <p className="text-sm text-gray-600">
                        {restaurant.location.city}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Contact & Social
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FaPhoneAlt className="text-orange-500" />
                        <span className="text-gray-700">
                          {restaurant.contact.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-orange-500" />
                        <span className="text-gray-700">
                          {restaurant.contact.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        <Link
                          href="https://facebook.com"
                          target="_blank"
                          className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                          <FaFacebook />
                        </Link>
                        <Link
                          href="https://instagram.com"
                          target="_blank"
                          className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
                        >
                          <FaInstagram />
                        </Link>
                        <Link
                          href="https://twitter.com"
                          target="_blank"
                          className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                        >
                          <FaTwitter />
                        </Link>
                        <Link
                          href="https://zerofeekitchen.bd"
                          target="_blank"
                          className="w-10 h-10 bg-gray-700 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                        >
                          <FaGlobe />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Opening Hours */}
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 sticky top-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <FaRegClock className="text-orange-600" />
                    Opening Hours
                  </h2>
                  <ul className="space-y-3">
                    {Object.entries(restaurant.openingHours).map(
                      ([day, hours]) => {
                        const isToday = getCurrentDay() === day;
                        return (
                          <li
                            key={day}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                              isToday
                                ? "bg-orange-500 text-white"
                                : "bg-white text-gray-700"
                            }`}
                          >
                            <span className="capitalize font-medium">
                              {day}
                            </span>
                            <span
                              className={
                                isToday ? "text-white" : "text-gray-600"
                              }
                            >
                              {hours.open && hours.close
                                ? `${formatTime(hours.open)} - ${formatTime(
                                    hours.close
                                  )}`
                                : "Closed"}
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Menu Items</h2>
            <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full border">
              {restaurantMenuItems.length} items available
            </div>
          </div>

          {restaurantMenuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurantMenuItems.map((menu) => (
                <MenuCard
                  key={menu._id}
                  menu={menu}
                  restaurants={[restaurant]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Menu Items Available
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This restaurant hasn't added any menu items yet. Please check
                back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
