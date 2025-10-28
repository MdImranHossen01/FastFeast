"use client";
import { FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light"); // SSR-safe default theme
  const [mounted, setMounted] = useState(false); // hydration fix flag
  const audioRef = useRef(null)

  // Load theme only after client mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  // Apply theme
  useEffect(() => {
    if (!mounted) return; // prevent SSR mismatch
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const handleToggle = (e) => {
    audioRef.current.play()
    setTheme(e.target.checked ? "dark" : "light");
  };

  if (!mounted) return null; // prevent mismatch during hydration

  return (
    <div className="p-0.5 rounded-full hover:bg-primary/30 duration-500 max-w-19 fixed top-40 rotate-90 z-20">
      <div className="p-1 rounded-full bg-primary/30">
        <label
          className={`relative flex items-center cursor-pointer w-14 h-8 border-2 border-primary rounded-full transition-colors duration-300 ${theme === "dark" ? "bg-[#FAFAFA]" : "bg-[#010515]"
            }`}
        >
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleToggle}
            className="sr-only"
          />

          {/* Toggle knob */}
          <div
            className={`absolute w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "translate-x-6" : ""
              }`}
          >
            {theme === "dark" ? (
              <FaMoon className="text-primary p-1.5 -rotate-120 text-2xl bg-[#010515] rounded-full" />
            ) : (
              <MdSunny className="text-primary p-1.5 text-[24px] bg-[#FAFAFA] rounded-full" />
            )}
          </div>
        </label>
        <audio ref={audioRef} src="/audio/toggle.mp3" />
      </div>
    </div>
  );
}