import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { MdLocationSearching } from "react-icons/md";
import { FiUser, FiGrid, FiLogOut } from "react-icons/fi";

const UserMenu = ({
  session,
  isOpen,
  setIsOpen,
  setIsOrderStatusModalOpen,
  dropdownRef,
}) => {
  const user = session?.user;
  let conditionalDashboard = "";

  if (user.role === "rider") {
    conditionalDashboard = "/rider-dashboard";
  } else if (user.role === "restaurantOwner") {
    conditionalDashboard = "/restaurant-dashboard";
  } else if (user.role === "moderator") {
    conditionalDashboard = "/moderator-dashboard";
  } else if (user.role === "admin") {
    conditionalDashboard = "/admin-dashboard";
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Image
        src={
          session.user?.image ||
          `https://avatar.vercel.sh/${session.user?.email}`
        }
        alt={session.user?.name || "User"}
        width={40}
        height={40}
        className="cursor-pointer rounded-full transition-transform duration-300 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg border bg-white shadow-lg z-50"
          >
            <div className="border-b p-4 text-center">
              <p className="font-semibold text-gray-800">{session.user?.name}</p>
              <p className="text-sm text-gray-500">{session.user?.email}</p>
            </div>
            <ul className="p-2">
              <li className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                <MdLocationSearching />{" "}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsOrderStatusModalOpen(true);
                  }}
                >
                  Order Status
                </button>
              </li>
              <li className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                <FiUser />{" "}
                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  My Profile
                </Link>
              </li>
              <li className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                <FiGrid />{" "}
                <Link
                  href={`${conditionalDashboard}`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 font-medium text-red-500 hover:bg-red-50 transition-transform duration-300 hover:scale-105">
                <FiLogOut />
                <button
                  onClick={() => {
                    setIsOpen(false);
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
  );
};

export default UserMenu;
