"use client";
import React, { useRef, useEffect } from 'react';

// This component uses a combination of CSS properties (background-clip: text) 
// and absolute positioning to create a "video text fill" effect.
const VideoTextFill = ({ 
    heading = "FASTFEAST", 
    videoSrc = "/Matrix_Compressed_420px.mp4" 
}) => {
    const videoRef = useRef(null);
    const textRef = useRef(null);

    // Effect to ensure the video always plays
    useEffect(() => {
        if (videoRef.current) {
            // Using play() inside useEffect often helps ensure autoPlay works, 
            // especially on browsers with strict auto-play policies.
            videoRef.current.play().catch(error => {
                console.error("Video Playback Error:", error);
            });
        }
    }, []);

    // The component structure is designed to contain the video and text.
    // The parent has a solid black background, and the video is clipped by the text.
    return (
        <div 
            className="relative w-screen h-screen overflow-hidden bg-black"
            style={{ 
                // Ensures a monospace-style font for a technical look
                fontFamily: 'Consolas, Monaco, monospace',
            }}
        >
            {/* 1. The Video Element */}
            {/* The video MUST cover the area of the text to be clipped properly. */}
            <video
                ref={videoRef}
                className="absolute h-full w-full object-cover"
                // The video needs to be large enough to contain the text
                style={{
                    minWidth: '100%',
                    minHeight: '100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0, // Keep video behind the text
                }}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline 
                poster="/images/video-poster.jpg" // Fallback image
            >
                Your browser does not support the video tag.
            </video>

            {/* 2. The Text Overlay Container */}
            <div 
                className="absolute inset-0 flex items-center justify-center p-4 z-10"
            >
                <h1 
                    ref={textRef}
                    className="font-black uppercase leading-none tracking-widest text-[5rem] md:text-[10rem] lg:text-[15rem]"
                    // Apply custom CSS properties for the clipping effect
                    style={{
                        // 1. Make the text color transparent
                        color: 'transparent',
                        
                        // 2. Clip the video (which is the background of this element) to the text shape
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',

                        // 3. Set the background to the video element.
                        // We use the same background image fallback here for consistency.
                        // The actual video feed will show through due to the clip property.
                        backgroundImage: `url(/images/video-poster.jpg)`, 
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',

                        // 4. Subtle shadow for definition against the black background
                        textShadow: '0 0 5px rgba(0, 255, 0, 0.4)', 
                    }}
                >
                    {heading}
                </h1>
            </div>
            
            {/* We use the video running globally, but its content is only visible 
                through the background-clip: text applied to the H1 element.
                The surrounding div's black background hides the rest of the video.
            */}
        </div>
    );
};

export default VideoTextFill;
