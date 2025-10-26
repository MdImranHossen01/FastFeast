"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

import Logo from "../logo";
import OrderStatusModal from "../OrderStatusModal";
import MobileDrawer from "./MobileDrawer";
import RightIcons from "./RightIcons";
import { useScroll, useClickOutside, useNotifications } from "./hooks";
import { useCart } from "@/lib/cartContext";
// import InstallButton from "@/components/pwa/InstallButton";

// In your navbar index.jsx, you can add smooth scrolling like this:

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState(false);

  const isScrolled = useScroll();
  const { cartCount } = useCart();

  const userMenuRef = useClickOutside(() => setIsUserMenuOpen(false));
  const notificationRef = useClickOutside(() =>
    setIsNotificationDropdownOpen(false)
  );

  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(session);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menus", label: "Menus" },
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
          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-110"
          >
            <FiMenu size={24} />
          </button>
          {/* Add this where you want the install button to appear */}
          {/* <InstallButton /> */}
          {/* Logo - Centered, Hidden when scrolled */}
          {!isScrolled && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Logo />
            </div>
          )}

          {/* Right Icons */}
          <RightIcons
            cartCount={cartCount}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            isNotificationDropdownOpen={isNotificationDropdownOpen}
            setIsNotificationDropdownOpen={setIsNotificationDropdownOpen}
            setIsOrderStatusModalOpen={setIsOrderStatusModalOpen}
            userMenuRef={userMenuRef}
            notificationRef={notificationRef}
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            session={session}
          />
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <MobileDrawer
        isOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        session={session}
        navItems={navItems}
      />

      {/* Order Status Modal */}
      <OrderStatusModal
        isOpen={isOrderStatusModalOpen}
        onClose={() => setIsOrderStatusModalOpen(false)}
        userEmail={session?.user?.email}
      />
    </>
  );
};

export default Navbar;