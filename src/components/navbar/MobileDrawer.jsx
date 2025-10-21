import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import Logo from "../logo";
import NavLink from "./NavLink";

const MobileDrawer = ({ isOpen, setIsMenuOpen, session, navItems }) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
                className="p-2 text-gray-700 transition-all duration-300 hover:text-orange-500 cursor-pointer"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex flex-col h-full">
              <ul className="flex flex-col p-4 overflow-y-auto">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    mobile={true}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
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
  );
};

export default MobileDrawer;