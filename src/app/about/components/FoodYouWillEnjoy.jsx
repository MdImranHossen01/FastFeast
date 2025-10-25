import Image from 'next/image'
import React from 'react'
import "../styles.css";

export default function FoodYouWillEnjoy() {
  return (
    <section className="py-10">
      <div className="container mx-auto overflow-hidden relative min-h-[500px] bg-base-100 rounded-4xl ">
        <div className="absolute z-10 top-1/2 transform -translate-y-1/2 p-5">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
            Foods You Will Enjoy
          </h1>
          <p className="max-w-[50%] mt-4">
            We have a dedicated teem to check the quality of the restaurant and there foods quality. We never want you experience bad food by FastFest
          </p>
        </div>
        <Image className='slow-spin absolute right-0 translate-x-[50%] ' src={"/pizza_02.webp"} alt='A pizza' height={500} width={500} />
      </div>
    </section>
  )
}

