import React from 'react';
// Importing specific, professional-looking icons from Font Awesome (Fa)
import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';

export default function SocialIcons() {
  // Common Tailwind classes for size, animation, and interaction
  const iconClasses = "text-4xl transition-colors duration-200 hover:scale-110 active:scale-95";

  return (
    // Styling the container to separate it slightly from content above
    <div className="mt-8 pt-4 border-t border-gray-200 rounded-lg p-2 bg-white shadow-inner">
      <h3 className="text-lg font-bold mb-4 text-gray-800">
        Stay Connected
      </h3>
      <div className="flex justify-around gap-4">
        
        {/* Facebook Icon */}
        <a 
          href="https://facebook.com/example-blog" // Replace with actual Facebook link
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Follow us on Facebook"
        >
          <FaFacebookSquare className={`${iconClasses} text-blue-600 hover:text-blue-800`} />
        </a>

        {/* Twitter Icon */}
        <a 
          href="https://twitter.com/example-blog" // Replace with actual Twitter link
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Follow us on X (Twitter)"
        >
          <FaTwitterSquare className={`${iconClasses} text-sky-500 hover:text-sky-700`} />
        </a>

        {/* YouTube Icon */}
        <a 
          href="https://youtube.com/example-channel" // Replace with actual YouTube link
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Subscribe to our YouTube channel"
        >
          <FaYoutubeSquare className={`${iconClasses} text-red-600 hover:text-red-800`} />
        </a>
      </div>
    </div>
  );
}
