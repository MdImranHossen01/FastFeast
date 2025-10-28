// src/app/layout.jsx
import Script from "next/script";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import dynamic from "next/dynamic";

import CursorFlower from "@/components/CursorFlower";
import SessionWrapper from "@/providers/SessionWrapper";
import AOSProvider from "@/providers/AOSProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextThemeProvider from "@/providers/NextThemeProvider";
import { CartProvider } from "@/lib/cartContext";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/lib/StoreProvider";
import LenisProvider from "@/providers/LenisProvider";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

// Preload critical fonts

export const metadata = {
  title: "FastFeast - Food Delivery App",
  description:
    "Delicious food delivered to your doorstep. Order from your favorite restaurants with FastFeast.",
  keywords: "food delivery, restaurant, order food, fast food, delivery",
  authors: [{ name: "FastFeast Team" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FastFeast",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icons/icon-192x192.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ff6b00",
};

// Dynamic imports for non-critical components
const Chatbot = dynamic(() => import("@/components/chatbot"), {
  loading: () => null,
});

const PWAInstaller = dynamic(() => import("@/components/pwa/PWAInstaller"), {
  loading: () => null,
});

const OfflineIndicator = dynamic(
  () => import("@/components/pwa/OfflineIndicator"),
  {
    loading: () => null,
  }
);

const ServiceWorker = dynamic(() => import("@/components/pwa/ServiceWorker"), {
  loading: () => null,
});

const LiveTraffic = dynamic(() => import("@/components/LiveTraffic"), {
  loading: () => null,
});

const ScrollToTopButton = dynamic(
  () => import("@/components/ui/ScrollToTopButton"),
  {
    loading: () => null,
  }
);

// Create a client component wrapper for the non-critical components
function NonCriticalComponents() {
  return (
    <>
      <ServiceWorker />
      <OfflineIndicator />
      <Chatbot />
      <PWAInstaller />
      <LiveTraffic />
      <ScrollToTopButton />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/icons/icon-192x192.png"
          as="image"
          type="image/png"
        />

        {/* PRELOAD BANNER VIDEOS FOR INSTANT LOADING */}
        <link rel="preload" href="/video1.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video3.mp4" as="video" type="video/mp4" />

        {/* PRELOAD POSTER IMAGES */}
        <link
          rel="preload"
          href="/video1-poster.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/video2-poster.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/video3-poster.jpg"
          as="image"
          type="image/jpeg"
        />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FastFeast" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ff6b00" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Critical above-the-fold styles to prevent FCP issues */
          body { 
            margin: 0; 
            font-family: var(--font-geist-sans), system-ui, sans-serif;
            background: white;
            color: #000;
          }
          * { box-sizing: border-box; }
          
          /* Smooth video loading */
          .slide-video {
            transition: opacity 0.3s ease-in-out;
          }
        `,
          }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Critical content first */}
        <div id="critical-content">
          <ThemeToggle />
          <SessionWrapper>
            <NextThemeProvider>
              <AOSProvider>
                <StoreProvider>
                  <CartProvider>
                    <LenisProvider>
                      <header>
                        <Navbar />
                      </header>
                      <main>{children}</main>
                      <footer>
                        <Footer />
                      </footer>
                      <Toaster position="top-center" />
                    </LenisProvider>
                  </CartProvider>
                </StoreProvider>
              </AOSProvider>
            </NextThemeProvider>
          </SessionWrapper>
        </div>

        {/* Non-critical components */}
        <NonCriticalComponents />

        {/* Cursor follower + click bloom (mount once) */}
        <CursorFlower />

        {/* Google Translate container OUTSIDE React UI */}
        <div
          id="gt-container"
          style={{
            position: "fixed",
            left: "-9999px",
            top: 0,
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        />

        {/* Init callback (runs once after hydration) */}
        <Script id="gt-init" strategy="afterInteractive">
          {`
  window.googleTranslateElementInit = function () {
    try {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,bn,hi,es,ar',
          autoDisplay: false
        },
        'gt-container'
      );
    } catch (e) {
      // ignore if script isn't ready; the real script will call us again
    }
  };
`}
        </Script>

        <Script id="gt-sanitize" strategy="afterInteractive">
          {`
  (function () {
    function sanitize(node) {
      const s = node && node.style;
      if (!s) return;
      // Only remove GT-problematic properties
      if (s.position) s.position = "";
      if (s.top) s.top = "";
      if (s.overflow === "hidden") s.overflow = "";
    }

    const restore = () => {
      sanitize(document.documentElement);
      sanitize(document.body);
    };

    // Run now and on common events
    restore();
    window.addEventListener("resize", restore);
    window.addEventListener("orientationchange", restore);

    // Watch for inline style mutations from GT
    const opts = { attributes: true, attributeFilter: ["style"] };
    const moHtml = new MutationObserver(restore);
    const moBody = new MutationObserver(restore);
    moHtml.observe(document.documentElement, opts);
    moBody.observe(document.body, opts);
  })();
`}
        </Script>

        {/* Load Google script once, calls googleTranslateElementInit */}
        <Script
          id="gt-script"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* end google translate */}

        {/* Video preloading script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                // The problematic line criticalContent.style.visibility = 'visible'; has been removed.
                // Critical content is now visible by default as there's no CSS hiding it.
                
                // Additional video preloading
                const videos = ['/video1.mp4', '/video2.mp4', '/video3.mp4'];
                videos.forEach(videoSrc => {
                  const video = document.createElement('video');
                  video.preload = 'auto';
                  video.src = videoSrc;
                });
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
