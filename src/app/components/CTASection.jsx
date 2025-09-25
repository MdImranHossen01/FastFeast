import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="py-8 lg:py-12">
      {/* Section Heading */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Become a <span className="text-orange-500">Partner with</span>{" "}
          FastFeast
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Join us today — whether you’re a restaurant owner or a rider, let’s
          grow together and deliver happiness to thousands of customers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Restaurant Card - Subtle Border */}
        <div className="bg-white border border-orange-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
          <figure className="h-64">
            <img
              src="delivary_boy_taking_food.webp"
              alt="Restaurant Partner"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="flex flex-col justify-between flex-1 p-6">
            <div className="space-y-3">
              <h3 className="font-bold text-2xl">
                List Your Restaurant on FastFeast
              </h3>
              <p className="text-lg text-gray-700">
                Would you like millions of new customers to enjoy your amazing
                food and groceries? Let’s start our partnership today and grow
                together!
              </p>
            </div>
            <button className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white font-semibold text-lg rounded-xl py-3 px-6 hover:brightness-110 transition-all cursor-pointer">
              Become a Partner <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Rider Card - Subtle Background Tint */}
        <div className="bg-orange-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
          <figure className="h-64">
            <img
              src="rider_man.webp"
              alt="Rider Partner"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="flex flex-col justify-between flex-1 p-6">
            <div className="space-y-3">
              <h3 className="font-bold text-2xl">Become a FastFeast Hero</h3>
              <p className="text-lg text-gray-700">
                Are you a man of speed and a master of navigation? Become a
                Foodi Hero and earn up to 25,000 TK each month while spreading
                joy to doorsteps.
              </p>
            </div>
            <button className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white font-semibold text-lg rounded-xl py-3 px-6 hover:brightness-110 transition-all cursor-pointer">
              Become a Rider <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
