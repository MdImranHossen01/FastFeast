"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const CustomersReview = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review:
        "The food arrived hot and fresh! Delivery was faster than expected. Will definitely order again!",
      photo:
        "https://static.vecteezy.com/system/resources/thumbnails/001/620/812/large/close-up-face-of-little-girl-smiling-and-shy-free-video.jpg",
      order: "Pizza & Pasta Combo",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      review:
        "Great service and delicious food. The app makes ordering so convenient.",
      photo:
        "https://media.istockphoto.com/id/1167078560/photo/surprised-shocked-child-toddler-girl-with-hands-on-her-cheeks-isolated-on-light-background.jpg?s=1024x1024&w=is&k=20&c=_DAseJP4tsGVKcpBgg60mxpFRLQHsg1zywJ-ev37iZc=",
      order: "Sushi Platter",
    },
    // ... rest of reviews
  ];

  const StarRating = ({ rating }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const ReviewCard = ({ review }) => (
    <div className="hover:bg-white bg-amber-50 rounded-xl shadow-lg p-6 mx-4 w-80 flex-shrink-0 transform hover:scale-105 transition-transform duration-300 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4">
          <Image
            src={review.photo}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{review.name}</h3>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-4 italic break-words">
        "{review.review}"
      </p>
      <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
        Ordered:{" "}
        <span className="font-medium text-gray-700">{review.order}</span>
      </div>
    </div>
  );

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            What <span className="text-orange-500">Our</span> Customers Say
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Don't just take our word for it. Hear from some of our satisfied
            customers.
          </p>
        </div>

        {/* ✅ Marquee with react-fast-marquee */}
        <Marquee pauseOnHover={true} gradient={false} speed={10}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CustomersReview;
