"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function SpecialOffersSlider({ offers }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (_, next) => setActiveIndex(next),
    appendDots: (dots) => (
      <div className="pt-4">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-orange-500 transition" />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {offers.map((offer, index) => {
          const isActive = index === activeIndex || index === activeIndex + 1; // 2 slides visible

          return (
            <div key={offer.id} className="px-3">
              <motion.div
                initial={false}
                animate={
                  isActive
                    ? {
                        opacity: 1,
                        x: 0,
                        rotate: 0,
                        scale: 1,
                      }
                    : {
                        opacity: 0.5,
                        x: index % 2 === 0 ? -80 : 80,
                        rotate: index % 2 === 0 ? -5 : 5,
                        scale: 0.9,
                      }
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-[380px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl group bg-white"
              >
                {/* Image */}
                <Image
                  src={offer.img}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white z-10 flex flex-col gap-3 max-w-sm">
                  {offer.badge && (
                    <div className="flex">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block">
                        {offer.badge}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl md:text-2xl font-bold">
                    {offer.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200">
                    {offer.subtitle}
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl md:text-2xl font-extrabold text-orange-500">
                        {offer.price}
                      </span>
                      {offer.oldPrice && (
                        <span className="line-through text-gray-400 text-sm md:text-base">
                          {offer.oldPrice}
                        </span>
                      )}
                    </div>

                    <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full font-semibold shadow-md flex items-center gap-2 transition hover:scale-105">
                      Order Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </Slider>

      {/* Custom slick dots */}
      <style jsx global>{`
        .slick-dots li.slick-active div {
          background-color: #f97316 !important;
          width: 10px;
          height: 10px;
        }
      `}</style>
    </div>
  );
}
