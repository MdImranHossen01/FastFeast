import React from 'react'
import { Rakkas } from "next/font/google";

const rakkas = Rakkas({
    weight: ["400"],
    subsets: ["latin"],
});

export default function Banner() {
    return (
        <section className='min-h-screen flex justify-center items-center text-9xl text-orange-600 '>
            <h1 className={`${rakkas.className} `}>Meet the Developers</h1>
        </section>
    )
}
