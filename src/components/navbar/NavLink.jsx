import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavLink = ({ href, children, onClick, mobile = false }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (mobile) {
    return (
      <li className="mb-2">
        <Link
          href={href}
          className="block rounded-lg px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-all duration-300"
          onClick={onClick}
        >
          {children}
        </Link>
      </li>
    );
  }

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

export default NavLink;