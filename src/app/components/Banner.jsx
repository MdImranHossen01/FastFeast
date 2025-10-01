"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";

// SVG Icons
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FF7E8B"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="mr-2 flex-shrink-0"
  >
    <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0 3 1.3 3 3s-1.3 3-3 3z"></path>
  </svg>
);

const CaretDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#4F4F4F"
    width="12"
    height="12"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="flex-shrink-0"
  >
    <path d="M20 5.42l-10 10-10-10h20z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#828282"
    width="18"
    height="18"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="mr-2 flex-shrink-0"
  >
    <path d="M19.78 19.12l-3.88-3.9c1.28-1.6 2.080-3.6 2.080-5.8 0-5-3.98-9-8.98-9s-9 4-9 9c0 5 4 9 9 9 2.2 0 4.2-0.8 5.8-2.1l3.88 3.9c0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2c0.4-0.3 0.4-0.8 0.1-1.1zM1.5 9.42c0-4.1 3.4-7.5 7.5-7.5s7.48 3.4 7.48 7.5-3.38 7.5-7.48 7.5c-4.1 0-7.5-3.4-7.5-7.5z"></path>
  </svg>
);

const ScrollDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="ml-2 flex-shrink-0"
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
  </svg>
);

// Slider videos & content
const sliderContent = [
  {
    video: "/video1.mp4",
    title: "Gourmet Burgers",
    description:
      "Savor our juicy, handcrafted burgers made with premium ingredients and secret sauces.",
    offer: "50% OFF",
    tagline: "Today Only!",
    cta: "Order Now",
  },
  {
    video: "/video2.mp4",
    title: "Artisan Pizzas",
    description:
      "Wood-fired perfection with fresh toppings and homemade dough, delivered crispy.",
    offer: "20% OFF",
    tagline: "Limited Time",
    cta: "Explore Menu",
  },
  {
    video: "/video3.mp4",
    title: "Fresh Sushi",
    description:
      "Expertly crafted rolls with the finest fish, delivered right to your door.",
    offer: "Free Delivery",
    tagline: "All Week",
    cta: "See Specials",
  },
  {
    video: "/video4.mp4",
    title: "Delicious Tacos",
    description:
      "Authentic Mexican flavors with fresh ingredients and homemade tortillas.",
    offer: "Buy 1 Get 1",
    tagline: "Weekend Special",
    cta: "Taste Now",
  },
  {
    video: "/video5.mp4",
    title: "Refreshing Drinks",
    description:
      "Quench your thirst with our signature beverages and freshly squeezed juices.",
    offer: "Happy Hour",
    tagline: "3-6 PM Daily",
    cta: "View Drinks",
  },
];

const Banner = () => {
  // State for search and location
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  
  // State for location dropdown
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationDropdownRef = useRef(null);

  // Available locations
  const availableLocations = [
    "Dhanmondi",
    "Mirpur",
    "Uttara",
    "Banani",
    "Gulshan",
  ];

  // Handle location selection
  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setIsLocationOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll down
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative h-[60vh] lg:h-[85vh] w-full overflow-hidden">
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
            {/* Background video with zoom effect */}
            <div className="absolute inset-0 overflow-hidden">
              <video
                src={slide.video}
                autoPlay
                loop
                muted
                playsInline
                className="slide-video w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/20"></div>
            </div>

            {/* Content overlay with search functionality */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl mb-6 opacity-90 text-white max-w-2xl mx-auto"
                >
                  {slide.description}
                </motion.p>
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full max-w-3xl"
              >
                <div className="flex w-full items-center rounded-lg bg-orange-500/50 backdrop-blur-sm p-3 shadow-lg">
                  {/* Location Input */}
                  <div className="relative w-2/5" ref={locationDropdownRef}>
                    <div
                      className="flex items-center pr-2 cursor-pointer"
                      onClick={() => setIsLocationOpen(!isLocationOpen)}
                    >
                      <LocationIcon />
                      <input
                        type="text"
                        placeholder="Select Location"
                        value={location}
                        readOnly
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white cursor-pointer"
                      />
                      <CaretDownIcon />
                    </div>

                    {/* Location Dropdown */}
                    {isLocationOpen && (
                      <div className="absolute top-full mt-2 w-full rounded-md bg-orange-500/90 shadow-lg z-10 border border-orange-500/30">
                        <ul>
                          {availableLocations.map((loc) => (
                            <li
                              key={loc}
                              onClick={() => handleLocationSelect(loc)}
                              className="px-4 py-2 text-sm text-white hover:bg-orange-600 cursor-pointer"
                            >
                              {loc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="h-6 border-l border-gray-300"></div>

                  {/* Search Input */}
                  <div className="flex flex-1 items-center pl-4">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search for restaurant, cuisine or a dish"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white"
                    />
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <Link href={"/menu"}>
                  <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                    Explore Menu
                  </button>
                </Link>
              </motion.div>
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

      {/* Scroll Down Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex animate-bounce cursor-pointer items-center"
        onClick={handleScrollDown}
      >
        <div className="text-sm text-white xl:text-base 2xl:text-lg flex items-center">
          Scroll down
          <ScrollDownIcon />
        </div>
      </motion.div>

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
        .slide-video {
          transform: scale(1);
          transition: none;
        }

        .swiper-slide-active .slide-video {
          transform: scale(1.1);
          transition: transform 10s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Banner;