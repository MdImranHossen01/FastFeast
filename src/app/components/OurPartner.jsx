"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";
import Image from "next/image";

// Your partner logos array
const partnerLogos = [
  { src: "https://i.ibb.co.com/VcC54xRN/1.png", alt: "Partner Logo 1" },
  { src: "https://i.ibb.co.com/fm2tYG4/2.png", alt: "Partner Logo 2" },
  { src: "https://i.ibb.co.com/tTzpTRXx/3.png", alt: "Partner Logo 3" },
  { src: "https://i.ibb.co.com/8Dtwjvjn/4.png", alt: "Partner Logo 4" },
  { src: "https://i.ibb.co.com/LXJM9jKV/5.png", alt: "Partner Logo 5" },
  { src: "https://i.ibb.co.com/sppkFvDq/6.png", alt: "Partner Logo 6" },
  { src: "https://i.ibb.co.com/j9cR6QFK/7.png", alt: "Partner Logo 7" },
];


const OurPartner = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto py-16 px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
           Our <span className="text-orange-600">Partners</span>
          </h2>
          
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
          }}
          className="mySwiper"
        >
          {partnerLogos.map((logo, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="relative flex items-center justify-center h-40 lg:h-60">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="max-h-60 w-auto object-contain filter hover:grayscale-0 transition-all duration-300 hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurPartner;
