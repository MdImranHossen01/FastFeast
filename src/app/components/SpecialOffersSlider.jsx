"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamically import Slider (no SSR)
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function SpecialOffersSlider({ offers }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots) => (
      <div style={{ bottom: "-32px" }}>
        <ul className="m-0 flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-orange-500 transition"></div>
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {offers.map((offer) => (
          <div key={offer.id}>
            <div className="relative rounded-xl flex flex-col md:flex-row overflow-hidden min-h-[400px] bg-white">
              {/* Image */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <Image
                  src={offer.img}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-12 w-full md:w-1/2 relative">
                {offer.badge && (
                  <span className="self-start bg-orange-500 text-white font-semibold px-3 py-1 rounded-md text-xs mb-4">
                    {offer.badge}
                  </span>
                )}

                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-6">{offer.subtitle}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl md:text-3xl font-extrabold text-orange-500">
                      {offer.price}
                    </span>
                    {offer.oldPrice && (
                      <span className="line-through text-gray-400 text-lg">
                        {offer.oldPrice}
                      </span>
                    )}
                  </div>

                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105 flex items-center gap-2 cursor-pointer">
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
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom slick dot style */}
      <style jsx global>{`
        .slick-dots li.slick-active div {
          background-color: #f97316 !important;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  );
}
