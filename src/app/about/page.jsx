import React from 'react';
import About from './components/About';
import AboutCards from './components/AboutCards';
// import foodBg1 from '/coffee_and_assorted.webp'

const AboutPage = () => {
  return (
    <div className="">
      <div className="">
        <section
          style={{
            backgroundImage: `linear-gradient(to bottom, #00000099 , #000000), url(/coffee_and_assorted.webp)`
          }}
          className='bg-center bg-cover bg-no-repeat py-10 pb-32'>
          <div className="">
            <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">About Our Platform</h1>
          </div>
        </section>

        <AboutCards></AboutCards>


        <About></About>

        <section className=''>
          <div className="container">
            <h2 className="text-center font-bold text-2xl">
              Why Choose us?
            </h2>
            <div className="">

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;