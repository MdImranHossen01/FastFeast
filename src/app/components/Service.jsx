import React from "react";

const serviceData = [
  {
    id: "01",

    title: "Real-Time Order Tracking",
    description:
      "Track your food order live with real-time GPS from kitchen to doorstep, see every movement instantly, follow accurate delivery timelines, and stay fully updated with safe and reliable status alerts.",
  },
  {
    id: "02",

    title: "Fast Delivery by Riders",
    description:
      "Receive your meals quickly and safely from our trained delivery riders, enjoy smooth and timely drop-offs, get accurate arrival estimates, and experience fast and reliable food delivery every time.",
  },
  {
    id: "03",

    title: "Online Food Ordering",
    description:
      "Browse restaurants and order your favorite meals with a simple online system, explore detailed menus easily, place orders within seconds, and enjoy a smooth and reliable ordering experience always.",
  },
  {
    id: "04",

    title: "Restaurant Partnership",
    description:
      "Join our platform and grow your restaurant with seamless online tools, add and manage your menus easily, handle orders with full control, and build a trusted and reliable food business network.",
  },
];

export default function Service() {
  return (
    <section className="container mx-auto py-5">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {serviceData.map((service) => (
          <div
            key={service.id}
            className="card text-white card-lg p-1 bg-gradient-to-r from-orange-500 to-yellow-500  shadow-sm"
          >
            <div className="card-body">
              {service.icon}
              <h2 className="text-2xl font-semibold text-center ">
                {service.title}
              </h2>
              <p className=" ">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
