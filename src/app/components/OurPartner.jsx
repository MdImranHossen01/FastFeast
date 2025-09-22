// File: components/OurPartner.jsx

"use client";

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// A simple array for partner logos. Replace with your actual data.
const partnerLogos = [
  { src: 'https://i.ibb.co/L8DDdSn/niceresto.png', alt: 'Nice Resto Logo' },
  { src: 'https://i.ibb.co/bJCbT5f/good-food.png', alt: 'Good Food Logo' },
  { src: 'https://i.ibb.co/GQLD9GM/season-food.png', alt: 'Season Food Logo' },
  { src: 'https://i.ibb.co/JqjT254/speedy-fork.png', alt: 'Speedy Fork Logo' },
  { src: 'https://i.ibb.co/hK3kqt0/ecofood.png', alt: 'Ecofood Logo' },
  // Add more logos if you want
  { src: 'https://i.ibb.co/L8DDdSn/niceresto.png', alt: 'Nice Resto Logo' },
  { src: 'https://i.ibb.co/bJCbT5f/good-food.png', alt: 'Good Food Logo' },
];

const OurPartner = () => {
    return (
        <section className="bg-white py-12 lg:py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Our Partners
                </h2>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 40,
                        },
                    }}
                    className="mySwiper"
                >
                    {partnerLogos.map((logo, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex items-center justify-center h-24">
                                <img 
                                    src={logo.src} 
                                    alt={logo.alt} 
                                    className="max-h-16 w-auto object-contain" 
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            {/* Custom styles for pagination bullets to match the image */}
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background-color: #fecaca !important; /* Lighter red/pink */
                    width: 10px !important;
                    height: 10px !important;
                    opacity: 1 !important;
                }
                .swiper-pagination-bullet-active {
                    background-color: #dc2626 !important; /* Darker red */
                }
            `}</style>
        </section>
    );
};

export default OurPartner;