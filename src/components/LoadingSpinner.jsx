"use client"
import React from 'react';

const LoadingSpinner = ({ 
  size = "md", 
  variant = "pulse", 
  showText = true,
  className = "" 
}) => {
  const sizeClasses = {
    sm: {
      container: "h-6 w-6",
      text: "text-xs",
      logo: "text-sm"
    },
    md: {
      container: "h-12 w-12",
      text: "text-sm",
      logo: "text-xl"
    },
    lg: {
      container: "h-16 w-16",
      text: "text-base",
      logo: "text-2xl"
    },
    xl: {
      container: "h-20 w-20",
      text: "text-lg",
      logo: "text-3xl"
    }
  };

  // Logo-based spinner variants
  const spinnerVariants = {
    // Pulse animation with gradient text
    pulse: (
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className={`font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ${sizeClasses[size].logo} animate-pulse`}>
          FF
        </div>
        {showText && (
          <div className={`text-gray-600 ${sizeClasses[size].text} animate-pulse`}>
            Loading...
          </div>
        )}
      </div>
    ),

    // Rotating logo letters
    rotate: (
      <div className="flex items-center justify-center space-x-1">
        <span className={`font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ${sizeClasses[size].logo} animate-bounce`}>
          F
        </span>
        <span className={`font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ${sizeClasses[size].logo} animate-bounce`} style={{ animationDelay: '0.1s' }}>
          F
        </span>
      </div>
    ),

    // Circular progress with logo
    circular: (
      <div className="relative flex items-center justify-center">
        {/* Outer rotating circle */}
        <div className={`absolute border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin ${sizeClasses[size].container}`}></div>
        
        {/* Logo in center */}
        <div className={`font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ${sizeClasses[size].logo}`}>
          FF
        </div>
      </div>
    ),

    // Typing animation with full name
    typing: (
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className={`font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ${sizeClasses[size].logo} animate-pulse`}>
          FastFeast
        </div>
        {showText && (
          <div className="flex items-center space-x-1">
            <span className={`text-gray-600 ${sizeClasses[size].text}`}>Loading</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
    ),

    // Wave animation
    wave: (
      <div className="flex items-center justify-center space-x-1">
        {['F', 'a', 's', 't', 'F', 'e', 'a', 's', 't'].map((letter, index) => (
          <span
            key={index}
            className={`font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ${
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
            } animate-wave`}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationDuration: '1.5s'
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    ),

    // Bounce animation
    bounce: (
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="flex space-x-1">
          <div className={`font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ${sizeClasses[size].logo} animate-bounce`}>
            Fast
          </div>
          <div className={`font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ${sizeClasses[size].logo} animate-bounce`} style={{ animationDelay: '0.2s' }}>
            Feast
          </div>
        </div>
        {showText && (
          <div className={`text-gray-600 ${sizeClasses[size].text} animate-pulse`}>
            Preparing your experience...
          </div>
        )}
      </div>
    )
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {spinnerVariants[variant] || spinnerVariants.pulse}
    </div>
  );
};

export default LoadingSpinner;


// // Basic usage
// <LoadingSpinner />

// // Different sizes
// <LoadingSpinner size="sm" />
// <LoadingSpinner size="lg" />
// <LoadingSpinner size="xl" />

// // Different variants
// <LoadingSpinner variant="pulse" />
// <LoadingSpinner variant="rotate" />
// <LoadingSpinner variant="circular" />
// <LoadingSpinner variant="typing" />
// <LoadingSpinner variant="wave" />
// <LoadingSpinner variant="bounce" />

// // Without text
// <LoadingSpinner showText={false} />

// // With custom class
// <LoadingSpinner className="my-8" variant="circular" size="lg" />