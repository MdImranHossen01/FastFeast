"use client";

import { useEffect, useState } from "react";
import { IoLanguageOutline } from "react-icons/io5";

export default function Translate() {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);

  const changeLanguage = (code) => {
    setLang(code);
    const combo = document.querySelector("select.goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    }
    setOpen(false);
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "bn", label: "বাংলা" },
    { code: "hi", label: "हिन्दी" },
    { code: "es", label: "Español" },
    { code: "ar", label: "العربية" },
  ];

  // Auto-init to selected language
  useEffect(() => {
    const i = setInterval(() => {
      const combo = document.querySelector("select.goog-te-combo");
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
        clearInterval(i);
      }
    }, 300);
    return () => clearInterval(i);
  }, [lang]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.translate-container')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative select-none translate-container">
      {/* Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center gap-2 p-2 rounded-full
                   text-gray-700 dark:text-gray-300
                   hover:bg-gray-100 dark:hover:bg-gray-800
                   hover:text-primary-600 dark:hover:text-primary-400
                   transition-all duration-200 border border-transparent
                   hover:border-gray-200 dark:hover:border-gray-700"
        aria-label="Change language"
      >
        <IoLanguageOutline className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:block">
          {languages.find(l => l.code === lang)?.label || 'EN'}
        </span>
      </button>

      {/* Dropdown - Now opens on top */}
      {open && (
        <div
          className="absolute bottom-full right-0 mb-2 w-40 rounded-xl shadow-lg 
                     border border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-900 backdrop-blur-sm bg-opacity-95
                     text-gray-900 dark:text-gray-100 z-50
                     animate-in fade-in-0 zoom-in-95 duration-200"
        >
          {/* Arrow indicator */}
          <div className="absolute -bottom-1 right-3 w-3 h-3 rotate-45 
                         bg-white dark:bg-gray-900 border-r border-b 
                         border-gray-200 dark:border-gray-700"></div>
          
          {/* Language options */}
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`flex items-center w-full px-4 py-3 text-sm transition-all duration-200
                  ${
                    lang === language.code
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold border-r-2 border-primary-500"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
              >
                <span className="flex-1 text-left">{language.label}</span>
                {lang === language.code && (
                  <div className="w-2 h-2 rounded-full bg-primary-500 ml-2"></div>
                )}
              </button>
            ))}
          </div>

          {/* Footer with current language */}
          <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current: <span className="font-medium text-primary-600 dark:text-primary-400">
                {languages.find(l => l.code === lang)?.label}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}