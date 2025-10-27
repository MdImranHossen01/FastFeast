// src/app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SessionWrapper from "@/providers/SessionWrapper";
import AOSProvider from "@/providers/AOSProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextThemeProvider from "@/providers/NextThemeProvider";
import { CartProvider } from "@/lib/cartContext";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/lib/StoreProvider";
import Chatbot from "@/components/chatbot";
import PWAInstaller from "@/components/pwa/PWAInstaller";
import OfflineIndicator from "@/components/pwa/OfflineIndicator";
import ServiceWorker from "@/components/pwa/ServiceWorker";
import LiveTraffic from "@/components/LiveTraffic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#ff6b00",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FastFeast" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ff6b00" />
        <meta name="msapplication-tap-highlight" content="no" />
        {/* theme-color is handled by viewport export in Next.js 15 */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ServiceWorker />
        <SessionWrapper>
          <NextThemeProvider>
            <AOSProvider>
              <StoreProvider>
                <CartProvider>
                  <OfflineIndicator />
                  <header>
                    <Navbar />
                  </header>
                  <main>{children}</main>
                  <Chatbot />
                  <PWAInstaller />
                  <LiveTraffic />
                  <Toaster position="top-center" />
                  <footer>
                    <Footer />
                  </footer>
                </CartProvider>
              </StoreProvider>
            </AOSProvider>
          </NextThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
