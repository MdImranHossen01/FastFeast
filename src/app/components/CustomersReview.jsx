"use client";
import React from "react";
import Image from "next/image";

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
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      review:
        "Amazing quality! Tastes just like restaurant food. Delivery person was very professional.",
      photo:
        "https://media.istockphoto.com/id/1295792181/photo/little-girl-hand-on-chin-on-white.jpg?s=1024x1024&w=is&k=20&c=N5T2q_B9sMpvPwZWe1oh8rha1i0romQuF3q6M6ZdPSs=",
      order: "Mexican Fiesta",
    },
    {
      id: 4,
      name: "David Kim",
      rating: 5,
      review:
        "Best food delivery experience ever! The packaging was excellent and food was perfect.",
      photo:
        "https://media.istockphoto.com/id/1167078560/photo/surprised-shocked-child-toddler-girl-with-hands-on-her-cheeks-isolated-on-light-background.jpg?s=1024x1024&w=is&k=20&c=_DAseJP4tsGVKcpBgg60mxpFRLQHsg1zywJ-ev37iZc=",
      order: "Korean BBQ Set",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      rating: 4,
      review:
        "Consistently good quality. I order from here at least twice a week!",
      photo:
        "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
      order: "Healthy Salad Bowl",
    },
    {
      id: 6,
      name: "James Wilson",
      rating: 5,
      review:
        "Fast delivery and the food was still hot. Portions are generous too!",
      photo:
        "https://media.istockphoto.com/id/2216116654/photo/sister-and-brother-against-white-background.jpg?s=1024x1024&w=is&k=20&c=y6scA4OuYrRaOVeTA3OTxWfxD8e8dlf1aYq0IffwDwM=",
      order: "Burger & Fries",
    },
  ];

  const StarRating = ({ rating }) => {
    return (
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
  };

  const ReviewCard = ({ review }) => (
    <div className="hover:bg-white bg-amber-50 rounded-xl shadow-lg p-6 mx-4 w-80 flex-shrink-0 transform hover:scale-105 transition-transform duration-300 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="relative w-22 h-22 rounded-full overflow-hidden mr-4">
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
      <p className="text-gray-600 text-sm mb-3 line-clamp-3 italic">
        "{review.review}"
      </p>
      <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
        Ordered:{" "}
        <span className="font-medium text-gray-700">{review.order}</span>
      </div>
    </div>
  );

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto text-gray-900 mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold">
            What Our <span className="text-orange-500">Customers</span> Say
          </h1>
          <p className="mt-2 text-gray-600">
            Don't just take our word for it. Hear from some of our satisfied
            customers.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10" />

          {/* Marquee */}
          <div className="flex space-x-4 animate-marquee whitespace-nowrap">
            {/* First set */}
            <div className="flex space-x-6 animate-scroll">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Duplicate for seamless loop */}
            <div className="flex space-x-4 animate-scroll" aria-hidden="true">
              {reviews.map((review) => (
                <ReviewCard key={review.id + reviews.length} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">On-Time Delivery</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-marquee:hover .animate-scroll {
          animation-play-state: paused;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default CustomersReview;
