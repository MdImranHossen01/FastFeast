"use client";

import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const offers = [
    {
      id: 1,
      title: "Classic Burger Combo",
      subtitle: "With fries & drink",
      price: "৳199",
      oldPrice: "৳299",
      img: "https://i.ibb.co/hxhmqdX3/grilled-burger-french-fries-food-generative-ai-188544-8516.jpg",
      badge: "25% OFF",
    },
    {
      id: 2,
      title: "Family Pizza Deal",
      subtitle: "Large + 2 sides",
      price: "৳499",
      oldPrice: "৳699",
      img: "https://i.ibb.co/23XpTbwn/family-pizza-combo-20923330.jpg",
      badge: "30% OFF",
    },
    {
      id: 3,
      title: "Sushi for Two",
      subtitle: "12 pcs assorted",
      price: "৳349",
      oldPrice: "৳449",
      img: "https://i.ibb.co/dwXQsNSj/zvubrrjb3p611.jpg",
      badge: "20% OFF",
    },
    {
      id: 4,
      title: "Healthy Salad Box",
      subtitle: "Fresh & crunchy",
      price: "৳149",
      oldPrice: "৳199",
      img: "https://i.ibb.co/jZ4CD64T/lunch-ideas.jpg",
      badge: "25% OFF",
    },
    {
      id: 5,
      title: "Breakfast Platter",
      subtitle: "Eggs, toast & coffee",
      price: "৳159",
      oldPrice: "৳219",
      img: "https://i.ibb.co/CKD1wXCC/Breakfast-board28.jpg",
      badge: "28% OFF",
    },
    {
      id: 6,
      title: "Tea Time Sweets",
      subtitle: "2 pastries + tea",
      price: "৳89",
      oldPrice: "৳129",
      img: "https://i.ibb.co/x8JKprC7/915ac0f5a12397193604fee28a3b6a3c.jpg",
      badge: "31% OFF",
    },
  ];

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
        <h1 className="text-4xl font-extrabold mb-2">Special Offers Just For You!</h1>
        <p className="text-gray-500 text-lg">
          Grab your favorite meals at unbeatable prices. Limited time only!
        </p>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {offers.map((offer) => (
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
                    <p className="text-sm text-gray-500 mb-3">{offer.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="text-xl font-bold">{offer.price}</div>
                      <div className="text-sm line-through text-gray-400">{offer.oldPrice}</div>
                    </div>
                    <button className="btn btn-sm btn-primary">Order Now</button>
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
