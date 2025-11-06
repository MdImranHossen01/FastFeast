"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { MdOutlineEmail, MdShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useCart } from "@/lib/cartContext";
import UserMenu from "./UserMenu";
import NotificationDropdown from "./NotificationDropdown";

const RightIcons = ({
  isUserMenuOpen,
  setIsUserMenuOpen,
  isNotificationDropdownOpen,
  setIsNotificationDropdownOpen,
  setIsOrderStatusModalOpen,
  userMenuRef,
  notificationRef,
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
}) => {
  const { data: session, status } = useSession();
  const { cartItems } = useCart();
  
  const cartCount = cartItems?.length || 0;

  const handleMessagesClick = (e) => {
    if (!session) {
      e.preventDefault();
      // Use window.location for full redirect to login
      window.location.href = `/login?callbackUrl=${encodeURIComponent('/messages')}`;
    }
    // If session exists, the Link will handle navigation normally
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Cart */}
      <Link
        href="/cart"
        className="relative flex flex-col items-center rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105"
      >
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
        <MdShoppingCart size={25} />
      </Link>

      {/* Notifications */}
      <div className="relative flex flex-col items-center rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105 cursor-pointer">
        <NotificationDropdown
          isOpen={isNotificationDropdownOpen}
          setIsOpen={setIsNotificationDropdownOpen}
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          dropdownRef={notificationRef}
        />
      </div>

      {/* Messages - Fixed Link */}
      <Link
        href="/messages"
        onClick={handleMessagesClick}
        className="relative flex flex-col items-center rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105"
      >
        <MdOutlineEmail size={25} />
      </Link>

      {session ? (
        <UserMenu
          session={session}
          isOpen={isUserMenuOpen}
          setIsOpen={setIsUserMenuOpen}
          setIsOrderStatusModalOpen={setIsOrderStatusModalOpen}
          dropdownRef={userMenuRef}
        />
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-2 rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105"
        >
          <CgProfile size={30} />
        </Link>
      )}
    </div>
  );
};

export default RightIcons;