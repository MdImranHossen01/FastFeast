import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="grid grid-cols-3 gap-5 rounded-2xl p-5 hover:shadow-xl">
          <figure className="">
            <img
              src="delivary_boy_taking_food.webp"
              alt=""
              className="rounded-xl h-full object-cover"
            />
          </figure>
          <div className="col-span-2 flex flex-col justify-center">
            <div className=" space-y-2">
              <h3 className="font-bold text-2xl">
                List Your Restaurant on FastFeast
              </h3>
              <p className="text-lg">
                Are you a man of speed and a master of navigation? Become a
                Foodi Hero and earn up to 25,000 TK each month while spreading
                joy to the doorsteps. Would you like millions of new customers
                to enjoy your amazing food and groceries? Let's start our
                partnership today!
              </p>
              <button className="btn bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg text-gray-700 text-xl p-7 mt-5">
                Become a Partner <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 rounded-2xl p-5 hover:shadow-xl">
          <figure className="">
            <img
              src="rider_man.webp"
              alt=""
              className="rounded-xl h-full object-cover"
            />
          </figure>
          <div className="col-span-2 flex flex-col justify-center">
            <div className=" space-y-2">
              <h3 className="font-bold text-2xl">Become a FastFeast Hero</h3>
              <p className="text-lg ">
                Would you like millions of new customers to enjoy your amazing
                food and groceries? Let's start our partnership today!
              </p>
              <button className="btn bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg text-gray-700 text-xl p-7 mt-5">
                Become a Rider <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
