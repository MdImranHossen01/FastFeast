import { Rakkas, Epilogue } from "next/font/google";
import React from "react";
import { OurTeam } from "./components/OurTeam";
import HowWeWork from "./components/HowWeWork";
import OurImpactInNumbers from "./components/OurImpactInNumbers";



const epilogue = Epilogue({
    weight: ["400", "500", "600", "700",],
    subsets: ["latin"],
});


const rakkas = Rakkas({
  weight: ["400"],
  subsets: ["latin"],
});

const AboutPage = async () => {
  
  return (
    <div className={`${epilogue.className}`}>
      <section className="">
        {/* Banner section */}
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #00000099 , #000000), url(/coffee_and_assorted.webp)`,
          }}
          className="bg-center bg-cover bg-no-repeat py-10 pt-32 px-2 min-h-[600px] bg-fixed"
        >
          <div className="container mx-auto justify-between ">
            <h1 className={`font-bold text-6xl lg:text-7xl bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent my-14 text-center ${rakkas.className}`}>
              About FastFest
            </h1>
            <p className="max-w-5xl mx-auto mt-8 px-2 text-gray-300 md:text-lg text-center mb-14">
              Tired of waiting for your food to arrive cold? <br />
              We are a modern food delivery platform that connects you with the best local restaurants. Our mission is to make ordering delicious food simple, fast, and reliable. With our dedicated delivery team, we ensure your food arrives hot and fresh, so you can enjoy every meal as if you were at the restaurant.

            </p>
            {/* <figure className="relative">
              <Image
                alt="Image of Burgers, Pizzas, Pasta, and Fried Chicken"
                src={food}
                width={600}
                height={200}
              />
            </figure> */}
          </div>
        </div>
      </section>

      <HowWeWork />
      <OurImpactInNumbers />
      <OurTeam />
    </div>
  );
};

export default AboutPage;
