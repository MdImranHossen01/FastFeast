"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

// Your partner logos array
const partnerLogos = [
  { src: "https://i.ibb.co/VcC54xRN/1.png", alt: "Partner Logo 1" },
  { src: "https://i.ibb.co/fm2tYG4/2.png", alt: "Partner Logo 2" },
  { src: "https://i.ibb.co/tTzpTRXx/3.png", alt: "Partner Logo 3" },
  { src: "https://i.ibb.co/8Dtwjvjn/4.png", alt: "Partner Logo 4" },
  { src: "https://i.ibb.co/LXJM9jKV/5.png", alt: "Partner Logo 5" },
  { src: "https://i.ibb.co/sppkFvDq/6.png", alt: "Partner Logo 6" },
  { src: "https://i.ibb.co/j9cR6QFK/7.png", alt: "Partner Logo 7" },
];

const OurPartner = () => {
  return (
    <section className="py-8 lg:py-12">
      <div>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Our <span className="text-orange-500">Partners</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            We're proud to partner with a diverse range of restaurants and food
            businesses to bring you the best culinary experiences.
          </p>
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
              <div className="flex items-center justify-center h-40 lg:h-60">
                <img
                  src={logo.src}
                  alt={logo.alt}
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
