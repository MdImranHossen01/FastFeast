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
            style={{
                backgroundImage: `url(/paper-texture.jpg)`,
            }}
            className='min-h-screen  bg-fixed bg-cover bg-no-repeat '>
            <div
                style={{
                    backgroundImage: `url(/code-line.png)`,
                    // backgroundPosition: '-100px'
                }}
                className="min-h-screen bg-fixed bg-size-[auto_350px] bg-bottom-right bg-no-repeat flex justify-center items-center text-9xl ">
                <div
                    style={{
                        backgroundImage: `url(/sl_031420_28950_10.jpg)`
                    }}
                    className="bg-animation-text bg-no-repeat text-transparent bg-clip-text  bg-cover  border-red-600 p-5">
                    <h1
                        // style={{
                        //     color: 'transparent',
                        //     // textShadow: '2px 2px #ff0000',
                        //     textShadow: '1px 1px 0 #00FF00, -1px -1px 0 #00FF00, 1px -1px 0 #00FF00, -1px 1px 0 #00FF00, 0 0 10px rgba(0, 255, 0, 0.7)',
                        // }}
                        className={`${rakkas.className} text-center text-6xl sm:text-7xl md:text-9xl bg-clip-border  bg-linear-to- from-violet-500 to-cyan-500`}>
                        <span className="text-4xl sm:text-5xl md:text-6xl">
                            The
                        </span>
                        <br />
                        Developers
                    </h1>
                </div>
            </div>
        </section>
    )
}
