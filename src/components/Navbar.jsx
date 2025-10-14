<<<<<<< HEAD
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiX, FiMenu, FiUser, FiGrid, FiLogOut } from "react-icons/fi";
import { MdLocationSearching, MdOutlineEmail } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { MdShoppingCart } from "react-icons/md";
import { useCart } from "@/lib/cartContext";
import OrderStatusModal from "./OrderStatusModal";
import { IoMdNotifications } from "react-icons/io";

// --- Reusable NavLink Component ---
const NavLink = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`relative block px-3 py-2 text-base font-medium transition-all duration-300 transform hover:scale-105 ${
          isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
        }`}
      >
        {children}
        {isActive && (
          <motion.span
            layoutId="underline"
            className="absolute left-0 -bottom-1 block h-[2px] w-full bg-orange-500"
          />
        )}
      </Link>
    </li>
  );
};

// Helper function to format date
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const d = dateString ? new Date(dateString) : new Date();
  return d.toLocaleDateString(undefined, options);
}

// --- Main Navbar Component ---
export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const { cartCount } = useCart();

  // Effect for scroll handling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notifications when user is logged in
  useEffect(() => {
    if (session?.user?.email) {
      fetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  const fetchNotifications = async () => {
    try {
      const url = `/api/notifications?userEmail=${encodeURIComponent(
        session.user.email
      )}`;
      const response = await fetch(url);
      const data = await response.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: true }),
      });

      // Update local state
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.isRead);
      await Promise.all(unread.map((n) => markAsRead(n.id)));
      setUnreadCount(0);
    } catch (e) {
      console.error("Error marking all as read:", e);
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/restaurants", label: "Restaurants" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/contacts", label: "Contact Us" },
  ];

  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 bg-transparent`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Hamburger Menu Icon - Always on the Left */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-110"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo - Centered, Hidden when scrolled */}
          {!isScrolled && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Logo />
            </div>
          )}

          {/* Right Icons */}
          <div className="flex gap-2 items-center">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex flex-col items-center rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105"
            >
              {cartCount > 0 && (
                <span className="absolute text-white text-xs font-bold">
                  {cartCount}
                </span>
              )}
              <MdShoppingCart size={25} />
            </Link>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() =>
                  setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                }
                className="relative flex flex-col items-center rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105"
              >
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
                <IoMdNotifications size={25} />
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {isNotificationDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-80 origin-top-right rounded-lg border bg-white shadow-lg"
                  >
                    <div className="border-b p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="divide-y">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                                !notification.isRead ? "bg-blue-50" : ""
                              }`}
                              onClick={() => {
                                if (!notification.isRead) {
                                  markAsRead(notification.id);
                                }
                              }}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <div
                                    className={`w-2 h-2 rounded-full mt-1.5 ${
                                      !notification.isRead
                                        ? "bg-blue-500"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {formatDate(notification.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Email Icon */}
            <div className="relative flex flex-col items-center rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105">
              <MdOutlineEmail size={25} />
            </div>

            {session ? (
              <div className="relative" ref={userMenuRef}>
                <Image
                  src={
                    session.user?.image ||
                    `https://avatar.vercel.sh/${session.user?.email}`
                  }
                  alt={session.user?.name || "User"}
                  width={40}
                  height={40}
                  className="cursor-pointer rounded-full transition-transform duration-300 hover:scale-110"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg border bg-white shadow-lg"
                    >
                      <div className="border-b p-4 text-center">
                        <p className="font-semibold">{session.user?.name}</p>
                        <p className="text-sm text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>
                      <ul className="p-2">
                        <li className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                          <MdLocationSearching />{" "}
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setIsOrderStatusModalOpen(true);
                            }}
                          >
                            Order Status
                          </button>
                        </li>
                        <li className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                          <FiUser />{" "}
                          <Link
                            href="/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                          <FiGrid />{" "}
                          <Link
                            href="/admin-dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 font-medium text-red-500 hover:bg-red-50 transition-transform duration-300 hover:scale-105">
                          <FiLogOut />
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              signOut();
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105"
              >
                <CgProfile size={30} />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl"
            >
              <div className="flex h-20 items-center justify-between px-4 border-b">
                <Logo />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-700 transition-all duration-300 hover:text-orange-500"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex flex-col h-full">
                <ul className="flex flex-col p-4 overflow-y-auto">
                  {navItems.map((item) => (
                    <li key={item.href} className="mb-2">
                      <Link
                        href={item.href}
                        className="block rounded-lg px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-gray-100 p-4">
                  {session ? (
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          session.user?.image ||
                          `https://avatar.vercel.sh/${session.user?.email}`
                        }
                        alt={session.user?.name || "User"}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{session.user?.name}</p>
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            signOut();
                          }}
                          className="text-sm text-red-500 transition-all duration-300"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/login"
                        className="rounded-lg bg-orange-500 py-2.5 text-center font-semibold text-white hover:bg-orange-600 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Order Status Modal */}
      <OrderStatusModal
        isOpen={isOrderStatusModalOpen}
        onClose={() => setIsOrderStatusModalOpen(false)}
        userEmail={session?.user?.email}
      />
    </>
  );
}
=======
// // Export the modular navbar from the navbar folder
export { default } from './navbar';
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
