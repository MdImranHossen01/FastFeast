import React from "react";
import banner from "../../../assets/restaurantsPage/abendbrot-939435.jpg";
import Image from "next/image";
export default function Banner({ search, setSearch }) {
  return (
    <div>
      {" "}
      <header className="mb-12 relative bg-cover h-120 bg-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={banner}
            alt="fastFeast restaurants banner"
            fill
            className="object-cover bg-black/50"
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10  px-4">
          {/* title */}
          <div className="max-w-5xl text-center ">
            <h3 className="text-3xl sm:text-5xl  uppercase  font-extrabold text-center bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent pt-5">
              Restaurant Listings
            </h3>
            <p className="mx-auto text-center text-gray-100 pb-3 sm:pb-5 text-lg pt-1 sm:pt-3 mb-4 m-3">
              Discover our trusted partner restaurants offering a wide variety
              of cuisines. Choose your favorite place and order delicious meals
              delivered right to your doorstep.
            </p>
          </div>
          {/* search */}

          <div
            className={`w-full  max-w-3xl bg-orange-500/30 shadow-lg z-10 border border-orange-500/30 rounded-full px-4   
                `}
          >
            <input
              type="text"
              placeholder="Search Restaurant"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white   shadow-xs p-4 outline-none  w-full placeholder:text-white"
            />
          </div>
        </div>
      </header>
    </div>
  );
}
