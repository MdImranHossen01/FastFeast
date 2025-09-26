"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const CustomersReview = () => {
  // --- ADDED: State to track if component is mounted on the client ---
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render
    setIsMounted(true);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review: "The food arrived hot and fresh! Delivery was faster than expected. Will definitely order again!",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288",
      order: "Pizza & Pasta Combo",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      review: "Great service and delicious food. The app makes ordering so convenient and the tracking is accurate.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287",
      order: "Sushi Platter",
    },
    {
      id: 3,
      name: "Fatima Ahmed",
      rating: 5,
      review: "Kacchi Bhai never disappoints! The order came perfectly packed and the taste was authentic. 10/10.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287",
      order: "Mutton Kacchi Biryani",
    },
    {
      id: 4,
      name: "David Lee",
      rating: 4,
      review: "The variety of restaurants is amazing. I can always find something new to try. Reliable and fast.",
      photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1288",
      order: "Thai Green Curry",
    },
    {
        id: 5,
        name: "Aisha Khan",
        rating: 5,
        review: "Perfect for late-night cravings. The 24/7 service is a lifesaver. My go-to app for food delivery.",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361",
        order: "Chicken Burger & Fries",
      },
  ];

  const StarRating = ({ rating }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const ReviewCard = ({ review }) => (
    <div className="flex-shrink-0 transform rounded-xl border border-gray-100 bg-amber-50 p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-white mx-4 w-80">
      <div className="mb-6 flex items-center">
        <div className="relative mr-4 h-20 w-20 overflow-hidden rounded-full">
          <Image src={review.photo} alt={review.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{review.name}</h3>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="mb-4 break-words text-sm italic text-gray-700">"{review.review}"</p>
      <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
        Ordered: <span className="font-medium text-gray-700">{review.order}</span>
      </div>
    </div>
  );

  // --- ADDED: Conditional check to prevent server-side rendering of the Marquee ---
  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            What <span className="text-orange-500">Our</span> Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Don't just take our word for it. Hear from some of our satisfied customers.
          </p>
        </div>

        <Marquee pauseOnHover={true} gradient={true} gradientColor={[255, 251, 235]} speed={30}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CustomersReview;