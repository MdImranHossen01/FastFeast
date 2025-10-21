import Link from "next/link";
import { useSession } from "next-auth/react";
import { MdOutlineEmail, MdShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useCart } from "@/lib/cartContext";
import UserMenu from "./UserMenu";
import NotificationDropdown from "./NotificationDropdown";

const RightIcons = ({
  cartCount,
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
  session,
}) => {
  return (
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

      {/* Email Icon */}
      <div className="relative flex flex-col items-center rounded-full font-semibold text-orange-500 transition-all duration-300 hover:text-orange-600 transform hover:scale-105 cursor-pointer">
        <MdOutlineEmail size={25} />
      </div>

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
