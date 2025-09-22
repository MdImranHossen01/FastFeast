"use client";

import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import offersData from "../../data/specialOffers.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import getOffers from "../actions/offers/getOffers";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} bg-white/90 p-2 rounded-full shadow-md hover:scale-105 transition-transform absolute z-10`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Previous"
    >
      ‹
    </button>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} bg-white/90 p-2 rounded-full shadow-md hover:scale-105 transition-transform absolute z-10`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Next"
    >
      ›
    </button>
  );
}

export default function SpecialOffers() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          Special Offers Just For You!
        </h1>
        <p className="text-gray-500 text-lg">
          Grab your favorite meals at unbeatable prices. Limited time only!
        </p>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {offersData.map((offer) => (
            <div key={offer.id} className="px-2">
              <div className="card bg-base-100 shadow-lg overflow-hidden rounded-2xl transform transition-transform hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                <div className="relative h-48 md:h-56 lg:h-60 w-full overflow-hidden">
                  <Image
                    src={offer.img}
                    alt={offer.title}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                  <div className="absolute top-3 left-3 badge badge-primary">
                    {offer.badge}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{offer.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {offer.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="text-xl font-bold">{offer.price}</div>
                      <div className="text-sm line-through text-gray-400">
                        {offer.oldPrice}
                      </div>
                    </div>
                    <button className="btn btn-sm btn-primary">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
