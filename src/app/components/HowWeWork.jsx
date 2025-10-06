import React from "react";

const HowWeWork = () => {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2">
        
        {/* === START: DIV 1 (Real-Time Order Tracking) === */}
        <div className="relative rounded-xl min-h-[300px] md:h-full group overflow-hidden">
          
          {/* Inner Div for Image Zoom Effect */}
          <div
            className="transition-transform duration-500 ease-in-out bg-cover bg-center h-full group-hover:scale-110"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/ZphjWJyY/Real-Time-food-Order-Tracking.jpg)",
            }}
          >
            {/* Image div is empty */}
          </div>

          {/* Text Overlay for Centering (Default text color is white) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
            {/* H1 has the hover effect directly */}
            <h1 className="text-2xl md:text-4xl font-bold mb-2 transition-colors duration-300 group-hover:text-orange-500">
              Advanced Search & Filters
            </h1>
            {/* P tag retains its white color */}
            <p className="text-sm md:text-lg">
              Quickly find exactly what you're craving by filtering menus by dietary needs (vegan, gluten-free), user rating, estimated prep time, or price range.
            </p>
          </div>
        </div>
        {/* === END: DIV 1 === */}

        <div className="flex gap-4 flex-col">
          
          {/* === START: DIV 2 (Fast Delivery by Riders) === */}
          <div className="relative rounded-xl min-h-[250px] md:h-1/2 group overflow-hidden">
            
            <div
              className="transition-transform duration-500 ease-in-out bg-cover bg-center h-full group-hover:scale-110"
              style={{
                backgroundImage:
                  "url(https://i.ibb.co.com/yFW7fFLf/Secure-Payments-sytem.jpg)",
              }}
            >
              {/* Image div is empty */}
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
              {/* H1 has the hover effect directly */}
              <h1 className="text-xl md:text-4xl font-bold mb-2 transition-colors duration-300 group-hover:text-orange-500">
                Multiple Secure Payments
              </h1>
              {/* P tag retains its white color */}
              <p className="text-sm md:text-lg">
                Pay your way with instant, secure options, including all major credit cards, popular digital wallets, and easy cash-on-delivery.
              </p>
            </div>
          </div>
          {/* === END: DIV 2 === */}

          
          {/* 5. Container for Div 3 & 4 */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            
            {/* === START: DIV 3 (Online Food Ordering) === */}
            <div className="relative rounded-xl min-h-[200px] group overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out bg-cover bg-center h-full group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url(https://i.ibb.co/C3XF1vBG/Online-Food-Ordering.jpg)",
                }}
              >
                {/* Image div is empty */}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
                {/* H1 has the hover effect directly (used smaller text size for the smaller box) */}
                <h1 className="text-lg md:text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-orange-500">
                  AI-Powered Menu Highlights
                </h1>
                {/* P tag retains its white color */}
                <p className="text-xs md:text-base">
                  Browse restaurants, explore menus, and place orders instantly with ease and reliability.
                </p>
              </div>
            </div>
            {/* === END: DIV 3 === */}

            {/* === START: DIV 4 (Restaurant Partnership) === */}
            <div className="relative rounded-xl min-h-[200px] group overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out bg-cover bg-center h-full group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url(https://i.ibb.co/pBzygjYG/Restaurant-Partnership.jpg)",
                }}
              >
                {/* Image div is empty */}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
                {/* H1 has the hover effect directly (used smaller text size for the smaller box) */}
                <h1 className="text-lg md:text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-orange-500">
                  Real-Time Customer Chat
                </h1>
                {/* P tag retains its white color */}
                <p className="text-xs md:text-base">
                  Communicate instantly with your delivery driver or customer support right through the app.
                </p>
              </div>
            </div>
            {/* === END: DIV 4 === */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;