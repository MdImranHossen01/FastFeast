// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\components\ThemeToggle\ThemeToggle.jsx

"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { useEffect, useState, useRef } from "react";

export default function ThemeToggle() {
  // Use the hook from next-themes. It handles everything for you.
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef(null);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // When the component is not mounted yet, we don't want to render anything
  // to avoid a hydration mismatch.
  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    // The hook provides the function to toggle the theme.
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  // Use resolvedTheme to avoid UI flicker on initial load
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div className="p-0.5 rounded-full hover:bg-orange-100 duration-500 max-w-16 fixed top-40 rotate-90 z-20">
      <div className="p-1 rounded-full bg-orange-100">
        <label
          className={`relative flex items-center cursor-pointer w-12 h-6 border border-orange-300 rounded-full transition-colors duration-300 ${
            currentTheme === "dark" ? "bg-gray-800" : "bg-orange-50"
          }`}
        >
          <input
            type="checkbox"
            checked={currentTheme === "dark"}
            onChange={handleToggle}
            className="sr-only"
          />

          {/* Toggle knob */}
          <div
            className={`absolute w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentTheme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {currentTheme === "dark" ? (
              <FaMoon className="text-orange-400 p-0.5 -rotate-90 text-sm bg-gray-900 rounded-full" />
            ) : (
              <MdSunny className="text-orange-500 p-0.5 text-sm bg-orange-100 rounded-full" />
            )}
          </div>
        </label>
        <audio ref={audioRef} src="/audio/toggle.mp3" />
      </div>
    </div>
  );
}