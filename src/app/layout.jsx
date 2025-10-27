// src/app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

import SessionWrapper from "@/providers/SessionWrapper";
import AOSProvider from "@/providers/AOSProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextThemeProvider from "@/providers/NextThemeProvider";
import { CartProvider } from "@/lib/cartContext";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/lib/StoreProvider"; 
import LenisProvider from "@/providers/LenisProvider";

// Preload critical fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
  display: 'swap',
});

export const metadata = {
  title: "FastFeast - Food Delivery App",
  description: "Delicious food delivered to your doorstep. Order from your favorite restaurants with FastFeast.",
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
  loading: () => null
});

const PWAInstaller = dynamic(() => import("@/components/pwa/PWAInstaller"), {
  loading: () => null
});

const OfflineIndicator = dynamic(() => import("@/components/pwa/OfflineIndicator"), {
  loading: () => null
});

const ServiceWorker = dynamic(() => import("@/components/pwa/ServiceWorker"), {
  loading: () => null
});

const LiveTraffic = dynamic(() => import("@/components/LiveTraffic"), {
  loading: () => null
});

const ScrollToTopButton = dynamic(() => import("@/components/ui/ScrollToTopButton"), {
  loading: () => null
});

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
        <link rel="preload" href="/icons/icon-192x192.png" as="image" type="image/png" />
        
        {/* PRELOAD BANNER VIDEOS FOR INSTANT LOADING */}
        <link rel="preload" href="/video1.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video3.mp4" as="video" type="video/mp4" />
        
        {/* PRELOAD POSTER IMAGES */}
        <link rel="preload" href="/video1-poster.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/video2-poster.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/video3-poster.jpg" as="image" type="image/jpeg" />
        
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
        <style dangerouslySetInnerHTML={{ __html: `
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
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Critical content first */}
        <div id="critical-content">
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

        {/* Video preloading script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                // Ensure content is visible
                const criticalContent = document.getElementById('critical-content');
                if (criticalContent) {
                  criticalContent.style.visibility = 'visible';
                }
                
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