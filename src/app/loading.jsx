"use client"
import React, { useState, useEffect } from 'react';

const Loading = ({ 
  size = "2xl", // Larger default size
  variant = "typewriter", // Professional typewriter as default
  showText = true,
  className = "" 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "FastFeast";

  // Typewriter effect
  useEffect(() => {
    if (variant === 'typewriter' && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else if (variant === 'typewriter' && currentIndex >= fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentIndex(0);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, variant]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: {
      container: "h-8 w-8",
      text: "text-sm",
      logo: "text-2xl",
      subtext: "text-xs"
    },
    md: {
      container: "h-12 w-12",
      text: "text-base",
      logo: "text-3xl",
      subtext: "text-sm"
    },
    lg: {
      container: "h-16 w-16",
      text: "text-lg",
      logo: "text-4xl",
      subtext: "text-base"
    },
    xl: {
      container: "h-24 w-24",
      text: "text-xl",
      logo: "text-5xl",
      subtext: "text-lg"
    },
    "2xl": { // New larger default
      container: "h-32 w-32",
      text: "text-2xl",
      logo: "text-6xl",
      subtext: "text-xl"
    },
    "3xl": { // Extra large option
      container: "h-40 w-40",
      text: "text-3xl",
      logo: "text-7xl",
      subtext: "text-2xl"
    }
  };

  const spinnerVariants = {
    // Professional typewriter effect - DEFAULT
    typewriter: (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className={`font-bold tracking-wide ${sizeClasses[size].logo}`}>
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <span 
              className={`inline-block w-1 h-[0.9em] ml-1 bg-orange-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              style={{ transition: 'opacity 0.1s' }}
            />
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-xl -z-10"></div>
        </div>
        
        {showText && (
          <div className="flex flex-col items-center space-y-3">
            <div className={`text-gray-500 font-light tracking-widest ${sizeClasses[size].subtext}`}>
              LOADING
            </div>
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
      </div>
    ),

    // Elegant pulse with shimmer
    elegant: (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className={`font-bold tracking-wide ${sizeClasses[size].logo} relative`}>
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent animate-pulse">
              FastFeast
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-amber-400/30 blur-2xl animate-pulse"></div>
        </div>
        
        {showText && (
          <div className={`text-gray-400 font-light tracking-[0.3em] ${sizeClasses[size].subtext} animate-pulse`}>
            CRAFTING EXPERIENCE
          </div>
        )}
      </div>
    ),

    // Premium circular with logo
    premium: (
      <div className="relative flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          {/* Outer rotating ring */}
          <div className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 animate-spin ${sizeClasses[size].container}`} style={{ maskImage: 'linear-gradient(transparent 40%, black 60%)' }}></div>
          
          {/* Inner glow ring */}
          <div className={`absolute inset-2 rounded-full bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-md animate-pulse`}></div>
          
          {/* Logo in center */}
          <div className={`relative flex items-center justify-center ${sizeClasses[size].container}`}>
            <div className={`font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent ${sizeClasses[size].logo}`}>
              FF
            </div>
          </div>
        </div>
        
        {showText && (
          <div className={`text-gray-500 font-light tracking-widest ${sizeClasses[size].subtext}`}>
            LOADING
          </div>
        )}
      </div>
    ),

    // Sophisticated wave
    wave: (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center justify-center">
          {['F', 'a', 's', 't', 'F', 'e', 'a', 's', 't'].map((letter, index) => (
            <span
              key={index}
              className={`font-bold bg-gradient-to-b from-orange-600 to-amber-500 bg-clip-text text-transparent ${sizeClasses[size].logo}`}
              style={{ 
                animation: 'wave 2s ease-in-out infinite',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        {showText && (
          <div className={`text-gray-400 font-light tracking-[0.25em] ${sizeClasses[size].subtext}`}>
            PLEASE WAIT
          </div>
        )}
      </div>
    ),

    // Modern glitch effect
    glitch: (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className={`font-bold tracking-wide ${sizeClasses[size].logo}`}>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                FastFeast
              </span>
              <span className="absolute top-0 left-0 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent animate-glitch">
                FastFeast
              </span>
              <span className="absolute top-0 left-0 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent animate-glitch" style={{ animationDelay: '0.3s' }}>
                FastFeast
              </span>
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-xl"></div>
        </div>
        
        {showText && (
          <div className={`text-gray-500 font-light tracking-widest ${sizeClasses[size].subtext}`}>
            INITIALIZING
          </div>
        )}
      </div>
    )
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-orange-50/30 z-50 ${className}`}>
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-glitch {
          animation: glitch 0.3s infinite;
          opacity: 0.8;
        }
      `}</style>
      
      <div className="text-center">
        {spinnerVariants[variant] || spinnerVariants.typewriter}
      </div>
    </div>
  );
};

export default Loading;

// Usage Examples:

// Default - Extra large professional typewriter
// <Loading />

// Different sizes
// <Loading size="3xl" />
// <Loading size="xl" />

// Other professional variants
// <Loading variant="elegant" />
// <Loading variant="premium" />
// <Loading variant="wave" />
// <Loading variant="glitch" />

// Without subtext
// <Loading showText={false} />

// Custom styling
// <Loading className="bg-slate-900" />