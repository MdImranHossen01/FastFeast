// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\components\Translate.jsx
"use client";

import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";

const GOOGLE_TRANSLATE_SCRIPT_ID = "googleTranslateScript";
const HIDE_TRANSLATE_STYLE_ID = "hideGoogleTranslate";

export default function Translate() {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    // --- Define the init function in the window scope ---
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,bn,hi,es,ar",
          autoDisplay: false,
          // Use a div to contain the widget, which we will hide
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // --- Inject the script ---
    if (!document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
      script.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      script.async = true;
      document.body.appendChild(script);
    }

    // --- Inject the CSS to hide the banner and widget ---
    if (!document.getElementById(HIDE_TRANSLATE_STYLE_ID)) {
      const style = document.createElement("style");
      style.id = HIDE_TRANSLATE_STYLE_ID;
      style.innerHTML = `
        body { top: 0px !important; }
        .goog-te-banner-frame { display: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-gadget-simple { display: none !important; }
        .goog-te-gadget-icon { display: none !important; }
      `;
      document.head.appendChild(style);
    }
    
    // --- Cleanup function ---
    return () => {
        // When the component unmounts, remove the script and styles
        const script = document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID);
        if (script) script.remove();

        const style = document.getElementById(HIDE_TRANSLATE_STYLE_ID);
        if (style) style.remove();

        // Clean up the global function
        delete window.googleTranslateElementInit;
    };
  }, [isMounted]);

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

  return (
    <div className="relative select-none">
      {/* 
        THE FIX: Use dangerouslySetInnerHTML to tell React not to manage this div's children.
        This prevents the 'removeChild' error because React will not try to clean up
        what the Google Translate script is doing inside this div.
      */}
      <div 
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: '<div id="google_translate_element"></div>' }}
        style={{ display: 'none' }}
      />
      
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-2 p-2 rounded-full text-gray-400 hover:text-orange-400 hover:bg-slate-800 transition-colors"
      >
        <FaGlobe className="w-6 h-6" />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-36 rounded-lg shadow-lg bg-slate-800 border border-slate-700 z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLanguage(l.code)}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                lang === l.code
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-slate-700"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}