"use client";
import React, { useEffect, useRef } from 'react';

// The main component that renders the Matrix Digital Rain effect
const MatrixRain = ({  fontSize = 16, animationSpeed = 2, children }) => {
    // 1. Refs for Canvas and Animation Frame ID
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);

    // 2. Constants for the animation
    const characters = '001101010111100101101011 0101011 101101010 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 01 0 1 0 1 0 1 01 0 1 0 1 0 1 0 1 0 1 0 1011011011000000 101111101 11 1 1 111 1 10 1 0 1 010 1 01 10 111 00 0110 10 111 10 00110011011001100101000 00 0011111010101010 1010 1';

    // Mutable state for the canvas drops array (stored in a ref to persist across renders)
    const dropsRef = useRef([]);

    // 3. useEffect Hook for Canvas Initialization and Animation Loop
    useEffect(() => {
        const canvas = canvasRef.current;

        // Safety check to ensure canvas is available before accessing context
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height, columns;

        const resizeCanvas = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            columns = Math.floor(width / fontSize);

            // Reinitialize drops for new column count
            dropsRef.current = [];
            for (let i = 0; i < columns; i++) {
                dropsRef.current[i] = 1; // Start each drop at the top
            }
        };

        const draw = () => {
            // Semi-transparent black rectangle for the "fade" effect (Matrix trail)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            // Set drawing style for the binary rain
            ctx.fillStyle = '#dd6b2050'; // rain text
            ctx.font = `${fontSize}px monospace`;

            const drops = dropsRef.current;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // If the character has dropped below the screen, reset it to the top
                // with a random chance (0.975 means a 2.5% chance of resetting)
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Increment the drop position
                drops[i]++;
            }

            animationFrameRef.current = requestAnimationFrame(draw);
        };

        // Initialize and setup resize listener
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Start the animation
        draw();

        // Cleanup function: runs when the component unmounts
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [fontSize]); // Rerun effect if fontSize changes

    return (
        // The main container fills the screen and sets the background
        <div className="relative w-screen h-screen  overflow-hidden">

            {/* Canvas for the Matrix Rain Effect */}
            <canvas
                ref={canvasRef}
                id="matrixCanvas"
                className="absolute inset-0 z-10 block bg-none"
            />

            {/* Centered Text Overlay */}
            <div
                id="centralText"
                // className='z-20'
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           text-orange-600 font-extrabold text-5xl md:text-7xl lg:text-8xl z-20 
                           whitespace-nowrap pointer-events-none tracking-widest"
                // Apply custom animation defined in globals.css
                // style={{ fontFamily: "'Consolas', 'Monaco', monospace", animation: `glowAndDim ${animationSpeed}s infinite alternate linear` }}
            >
                {/* <h1>Meet the Developers</h1> */}
                {children}
            </div>

            {/* The style block was removed to fix the SyntaxError. Keyframes must be global. */}
        </div>
    );
};

export default MatrixRain;
