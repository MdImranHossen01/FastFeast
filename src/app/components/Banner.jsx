"use client";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  const slides = [
    {
      img: "/banner1.jpg",
      title: "Delicious Burgers",
      subtitle: "Hot, Juicy & Delivered Fast",
      btnText: "Order Now",
    },
    {
      img: "/banner2.jpg",
      title: "Fresh Pizzas",
      subtitle: "Tasty, Cheesy & Always Fresh",
      btnText: "Explore Menu",
    },
    {
      img: "/banner3.jpg",
      title: "Crispy Fries",
      subtitle: "Golden, Crunchy & Irresistible",
      btnText: "Order Now",
    },
    {
      img: "/banner4.jpg",
      title: "Refreshing Drinks",
      subtitle: "Cool, Fresh & Perfect with Meals",
      btnText: "Explore Menu",
    },
  ];

  return (
    <div className="w-full rounded-2xl shadow-2xl overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/40 via-orange-500/30 to-orange-600/50 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold drop-shadow-md">
                {slide.subtitle}
              </p>
              <button className="mt-4 sm:mt-6 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-lg sm:text-xl md:text-2xl font-bold rounded-full bg-white text-orange-500 hover:scale-105 transition-transform drop-shadow-lg">
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
