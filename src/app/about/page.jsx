import React from "react";
import Logo from "@/components/logo";

const AboutPage = () => {
  return (
    <div className="">
      <section className="">
        {/* Banner section */}
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #00000099 , #000000), url(/coffee_and_assorted.webp)`,
          }}
          className="bg-center bg-cover bg-no-repeat py-10 "
        >
          <div className="container mx-auto justify-between flex items-center">
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">
              About FastFest
            </h1>
            <figure>
              <img
                src="/about/foods.png"
                alt="Image of Burgers, Pizzas, Pasta, and Fried Chicken"
              />
            </figure>
          </div>
        </div>
        {/* blogs blow the banner */}
        <p className="container mx-auto mt-8">
          Tired of waiting for your food to arrive cold or delayed? Our platform
          is the definitive solution. We've built a vast network of both popular
          eateries and hidden culinary gems across Bangladesh, all connected by
          a dedicated fleet of professional delivery partners. We are not just a
          service; we are a commitment to quality and punctuality. Our advanced
          logistics and professional team are dedicated to getting your food to
          you quickly, reliably, and in perfect condition, every time. With us,
          you get exactly what you want, when you want it.
          <br />
          <br />
          Our platform is built to bring your favorite flavors right to your
          doorstep, no matter where you are in the city. We meticulously partner
          with a wide selection of top chefs, renowned restaurants, and local
          food shops to offer an expansive menu that caters to every craving.
          From placing your order to watching its journey with our real-time
          tracking, we handle every detail with care. Our seamless and enjoyable
          ordering experience ensures that all you have to do is sit back,
          relax, and get ready to savor your food.
        </p>
      </section>

      <section className="container mx-auto my-10">
        <div className="container">
          <Logo />
          <h4 className="text-2xl font-bold my-4">
            Order food from the best restaurants and shops near by you with
            FastFeast.
          </h4>
          <p className="">
            We are more than just a food delivery service; we are a modern
            platform connecting you directly with the best local restaurants and
            kitchens right here in Bangladesh. Our mission is built on a simple
            promise: to make ordering delicious food simple, fast, and reliable.
            We understand that food is best when it's hot and fresh, which is
            why we've assembled a dedicated team of delivery professionals who
            know the local areas. They work tirelessly to ensure your meal
            arrives quickly and in perfect condition, so you can enjoy every
            bite as if you were at the restaurant.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
