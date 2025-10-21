"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { 
  setSearchQuery, 
  setLocation, 
  clearFilters 
} from "@/lib/features/filtersSlice";

// SVG Icons
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#FF7E8B" width="20" height="20" viewBox="0 0 20 20" className="mr-2 flex-shrink-0">
    <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0 3 1.3 3 3s-1.3 3-3 3z"></path>
  </svg>
);

const CaretDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#4F4F4F" width="12" height="12" viewBox="0 0 20 20" className="flex-shrink-0">
    <path d="M20 5.42l-10 10-10-10h20z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#828282" width="18" height="18" viewBox="0 0 20 20" className="mr-2 flex-shrink-0">
    <path d="M19.78 19.12l-3.88-3.9c1.28-1.6 2.080-3.6 2.080-5.8 0-5-3.98-9-8.98-9s-9 4-9 9c0 5 4 9 9 9 2.2 0 4.2-0.8 5.8-2.1l3.88 3.9c0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2c0.4-0.3 0.4-0.8 0.1-1.1zM1.5 9.42c0-4.1 3.4-7.5 7.5-7.5s7.48 3.4 7.48 7.5-3.38 7.5-7.48 7.5c-4.1 0-7.5-3.4-7.5-7.5z"></path>
  </svg>
);

const ClearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="16" height="16" viewBox="0 0 20 20" className="flex-shrink-0">
    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
  </svg>
);

const ScrollDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24" className="ml-2 flex-shrink-0">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
  </svg>
);

// Voice Search Icons
const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
  </svg>
);

const ListeningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#4CAF50" width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0 animate-pulse">
    <path d="M12 2C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14S10 13.1 10 12V4C10 2.9 10.9 2 12 2ZM17 12C17 14.8 14.8 17 12 17S7 14.8 7 12H5C5 15.9 8.1 19 12 19S19 15.9 19 12H17Z"/>
  </svg>
);

// Single video content
const sliderContent = [
  {
    video: "/video5.mp4",
    title: "Explore a kingdom of flavors",
    description: "Journey through a royal feast of taste and aroma. At FastFeast, every meal is a crown jewel—fresh, delicious, and delivered right to your door.",
  }
];

const Banner = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Get filters from Redux to sync state
  const { searchQuery, location } = useSelector((state) => state.filters);
  
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const availableLocations = ["Dhanmondi", "Mirpur", "Uttara", "Banani", "Gulshan"];

  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechSupported(!!SpeechRecognition);
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
        dispatch(setSearchQuery(currentTranscript));
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTranscript("");
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setTranscript("");
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [dispatch]);

  const handleLocationSelect = (selectedLocation) => {
    dispatch(setLocation(selectedLocation));
    setIsLocationOpen(false);
  };

  // Handle search submission
  const handleSearch = (e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    
    // Redirect to menu page with filters applied
    router.push('/menu');
  };

  // Clear search and redirect to menu
  const handleExploreMenu = () => {
    dispatch(clearFilters());
    router.push('/menu');
  };

  // Clear individual filters
  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
  };

  const handleClearLocation = () => {
    dispatch(setLocation(""));
  };

  // Voice search functions
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript("");
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Check if there are any active filters
  const hasActiveFilters = searchQuery || location;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1200}
        modules={[Autoplay, EffectFade]}
        className="h-full w-full"
      >
        {sliderContent.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background video without zoom effect */}
            <div className="absolute inset-0 overflow-hidden">
              <video src={slide.video} autoPlay loop muted playsInline className="slide-video w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/20"></div>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl mb-6 opacity-90 text-white max-w-2xl mx-auto"
                >
                  {slide.description}
                </motion.p>
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full max-w-3xl"
              >
                <div className="flex w-full items-center rounded-lg bg-orange-500/50 backdrop-blur-sm p-3 shadow-lg">
                  {/* Location Input */}
                  <div className="relative w-2/5" ref={locationDropdownRef}>
                    <div className="flex items-center pr-2 cursor-pointer" onClick={() => setIsLocationOpen(!isLocationOpen)}>
                      <LocationIcon />
                      <input
                        type="text"
                        placeholder="Select Location"
                        value={location}
                        readOnly
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white cursor-pointer"
                      />
                      <CaretDownIcon />
                    </div>

                    {isLocationOpen && (
                      <div className="absolute top-full mt-2 w-full rounded-md bg-orange-500/90 shadow-lg z-10 border border-orange-500/30">
                        <ul>
                          {availableLocations.map((loc) => (
                            <li
                              key={loc}
                              onClick={() => handleLocationSelect(loc)}
                              className="px-4 py-2 text-sm text-white hover:bg-orange-600 cursor-pointer"
                            >
                              {loc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="h-6 border-l border-gray-300"></div>

                  {/* Search Input */}
                  <div className="flex flex-1 items-center pl-4">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search for restaurant, cuisine or a dish"
                      value={searchQuery}
                      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                      onKeyDown={handleSearch}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white"
                    />
                    
                    {/* Voice Search Button - Only icon in search bar */}
                    {isSpeechSupported && (
                      <button
                        onClick={toggleListening}
                        className={`ml-2 p-1 rounded-full transition-all duration-300 ${
                          isListening 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                        aria-label={isListening ? "Stop listening" : "Start voice search"}
                        title={isListening ? "Stop listening" : "Start voice search"}
                      >
                        {isListening ? <ListeningIcon /> : <MicIcon />}
                      </button>
                    )}
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        dispatch(clearFilters());
                      }}
                      className="ml-2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      aria-label="Clear filters"
                    >
                      <ClearIcon />
                    </button>
                  )}
                </div>

                {/* Voice Search Status */}
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-2 text-center"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-green-300 text-sm font-medium">
                        Listening... {transcript && `"${transcript}"`}
                      </p>
                      <button
                        onClick={stopListening}
                        className="text-green-300 hover:text-white text-xs underline"
                      >
                        Stop
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Speech Recognition Not Supported Message */}
                {!isSpeechSupported && (
                  <div className="mt-2 text-center">
                    <p className="text-orange-300 text-sm opacity-80">
                      Voice search is not supported in your browser. Try Chrome or Edge.
                    </p>
                  </div>
                )}

                {/* Search Hint */}
                {(searchQuery || location) && !isListening && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-center"
                  >
                    <p className="text-white text-sm opacity-80">
                      Press Enter to search {searchQuery && `for "${searchQuery}"`} 
                      {searchQuery && location && ' in '} 
                      {location && `📍 ${location}`}
                    </p>
                  </motion.div>
                )}

                {/* Active Filters Display */}
                {hasActiveFilters && !isListening && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    {searchQuery && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                        <span>Search: {searchQuery}</span>
                        <button
                          onClick={handleClearSearch}
                          className="ml-1"
                          aria-label="Clear search"
                        >
                          <ClearIcon />
                        </button>
                      </div>
                    )}
                    {location && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                        <span>Location: {location}</span>
                        <button
                          onClick={handleClearLocation}
                          className="ml-1"
                          aria-label="Clear location"
                        >
                          <ClearIcon />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex flex-wrap gap-4 mt-8 justify-center"
              >
                {/* Search Button (visible when there's a search query) */}
                {(searchQuery || location) && (
                  <button 
                    onClick={handleSearch}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
                  >
                    Search Now
                  </button>
                )}
                
                {/* Regular Explore Menu Button */}
                <button 
                  onClick={handleExploreMenu}
                  className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Explore Menu
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Down Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex animate-bounce cursor-pointer items-center"
        onClick={handleScrollDown}
      >
        <div className="text-sm text-white xl:text-base 2xl:text-lg flex items-center">
          Scroll down
          <ScrollDownIcon />
        </div>
      </motion.div>

      {/* Global Styles - Zoom effect removed */}
      <style jsx global>{`
        .slide-video {
          transform: scale(1);
        }
      `}</style>
    </section>
  );
};

export default Banner;