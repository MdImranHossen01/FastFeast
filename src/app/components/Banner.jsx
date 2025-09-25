"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Slider images & content
const sliderContent = [
  {
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0",
    title: "Gourmet Burgers",
    description:
      "Savor our juicy, handcrafted burgers made with premium ingredients and secret sauces.",
    offer: "50% OFF",
    tagline: "Today Only!",
    cta: "Order Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0",
    title: "Artisan Pizzas",
    description:
      "Wood-fired perfection with fresh toppings and homemade dough, delivered crispy.",
    offer: "20% OFF",
    tagline: "Limited Time",
    cta: "Explore Menu",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0",
    title: "Fresh Sushi",
    description:
      "Expertly crafted rolls with the finest fish, delivered right to your door.",
    offer: "Free Delivery",
    tagline: "All Week",
    cta: "See Specials",
  },
];

const Banner = () => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1200}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          el: ".custom-pagination",
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full w-full"
      >
        {sliderContent.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background image with zoom effect */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="slide-image w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/20"></div>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Text content */}
                  <div className="text-white max-w-lg">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="mb-2 inline-block bg-orange-500/90 px-4 py-1 rounded-full text-sm font-semibold"
                    >
                      Special Offer
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-lg md:text-xl mb-6 opacity-90"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
                    >
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-orange-400">
                          {slide.offer}
                        </span>
                        <span className="ml-2 text-white/90">
                          {slide.tagline}
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="flex flex-wrap gap-4"
                    >
                      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                        {slide.cta}
                      </button>
                      <button className="border border-white/30 hover:border-white text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 backdrop-blur-sm">
                        Learn More
                      </button>
                    </motion.div>
                  </div>

                  {/* Decorative element */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="hidden md:flex justify-center"
                  >
                    <div className="relative w-64 h-64 bg-orange-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-orange-500/20">
                      <div className="w-52 h-52 bg-orange-500/5 rounded-full border border-orange-500/10"></div>
                      <div className="absolute text-white text-center">
                        <span className="text-5xl font-bold">
                          {slide.offer}
                        </span>
                        <p className="text-sm mt-2">{slide.tagline}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation */}
        <div className="custom-next absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-3 backdrop-blur-md hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="custom-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-3 backdrop-blur-md hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        {/* Custom pagination */}
        <div className="custom-pagination absolute bottom-4 left-1/2 z-10 -translate-x-1/2"></div>
      </Swiper>

      {/* Global Styles */}
      <style jsx global>{`
        .custom-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .custom-bullet:hover,
        .swiper-pagination-bullet-active {
          background: #ff7846 !important;
          transform: scale(1.3);
        }

        .custom-next:hover,
        .custom-prev:hover {
          background: rgba(255, 120, 70, 0.8) !important;
        }

        /* Fix zoom effect every slide */
        .slide-image {
          transform: scale(1);
          transition: none;
        }

        .swiper-slide-active .slide-image {
          transform: scale(1.1);
          transition: transform 10s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Banner;
