"use client"
import React from 'react'
import { Rakkas } from "next/font/google";
import "../style.css"

const rakkas = Rakkas({
    weight: ["400"],
    subsets: ["latin"],
});


//bg-size-[auto_500%]
//sl_031420_28950_10.jpg
///computer-program-coding-screen.jpg

export default function Banner() {
    return (
        <section
            // style={{
            //     backgroundImage: `url(/paper-texture.jpg)`,
            // }}
            className='min-h-screen  bg-fixed bg-cover bg-no-repeat '>
            <div
                // style={{
                //     backgroundImage: `url(/code-line.png)`,
                //     // backgroundPosition: '-100px'
                // }}
                className="min-h-screen banner-bg bg-fixed bg-size-[auto_350px] bg-bottom-right bg-no-repeat flex justify-center items-center text-9xl ">


                <div
                    style={{
                        // backgroundImage: `url(/sl_031420_28950_10.jpg)`
                    }}
                    className="bg-no-repeat p-5">
                    <h1 className={`banner-title text-6xl sm:text-7xl md:text-9xl  items-center ${rakkas?.className} ${``}`}>
                        <span className="mr-3 pb-2 text-gray-100 text-4xl sm:text-5xl md:text-6xl ">
                            The
                        </span>
                        <br  />
                        <span className="subtitle fire">D</span>
                        <span className="subtitle burn">e</span>
                        <span className="subtitle burn">v</span>
                        <span className="subtitle burn">e</span>
                        <span className="subtitle fire">l</span>
                        <span className="subtitle fire">o</span>
                        <span className="subtitle fire">p</span>
                        <span className="subtitle burn">e</span>
                        <span className="subtitle fire">r</span>
                        <span className="subtitle burn">s</span>
                    </h1>
                </div>
            </div>
        </section>
    )
}
