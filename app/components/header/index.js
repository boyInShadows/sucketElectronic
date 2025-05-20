"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  LogOut,
  Home,
  FileText,
  Package,
  Grid,
  User as UserIcon,
  Phone,
  Info,
} from "lucide-react";

// Images
import Logo from "@/app/public/images/Logo2.png";

const navLinks = [
  { name: "خانه", href: "/", icon: Home },
  { name: "محصولات", href: "/products", icon: Package },
  { name: "مقالات", href: "/articles", icon: FileText },
  { name: "ارتباط با ما", href: "/contactUs", icon: Phone },
];

const bottomNavLinks = [
  { name: "خانه", href: "/", icon: Home },
  { name: "محصولات", href: "/products", icon: Package },
  { name: "مقالات", href: "/articles", icon: FileText },
  { name: "ارتباط با ما", href: "/contactUs", icon: Phone },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get username and admin status from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedIsAdmin = localStorage.getItem("is_admin");

    if (storedUsername) {
      setUsername(storedUsername);
      setIsAdmin(storedIsAdmin === "true");
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_admin");
    setUsername("");
    setIsAdmin(false);
    setShowLogoutPopup(false);
    router.push("/login");
  };

  // Add users link if logged in and is admin (desktop only)
  const allNavLinks =
    username && isAdmin
      ? [
          ...navLinks,
          { name: "مدیریت کاربران", href: "/users", icon: UserIcon },
        ]
      : navLinks;

  return (
    <>
      <header className="bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm border-b border-neutral-200">
        <div className="mx-auto flex items-center justify-between h-16 sm:h-20 px-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src={Logo}
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>

          {/* Navigation (desktop only) */}
          <nav className="hidden md:flex items-center gap-x-8">
            {allNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-base flex items-center gap-2 px-2 py-1 transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-primary font-bold"
                    : "text-neutral-700 hover:text-primary"
                }`}
              >
                {link.icon && <link.icon className="w-5 h-5" />}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center bg-white/80 border border-neutral-200 rounded-full px-2 py-1 gap-x-1 shadow backdrop-blur-sm">
            <Link href="/products" aria-label="جست و جو محصول">
              <button
                className="p-2 rounded-full hover:bg-primary/10 focus:bg-primary/20 transition-colors duration-200 text-neutral-700 hover:text-primary"
                aria-label="جستجو"
              >
                <Search className="w-5 h-5" />
              </button>
            </Link>
            <Link
              href={username ? "/profile" : "/login"}
              className="flex items-center p-2 rounded-full hover:bg-primary/10 focus:bg-primary/20 transition-colors duration-200 text-neutral-700 hover:text-primary"
              aria-label="حساب کاربری"
            >
              <User className="w-5 h-5" />
              {username && (
                <span className="ml-1 text-sm font-semibold text-primary">
                  {username}
                </span>
              )}
            </Link>
            {username && (
              <button
                onClick={() => setShowLogoutPopup(true)}
                className="p-2 rounded-full hover:bg-red-100 focus:bg-red-200 transition-colors duration-200 text-neutral-700 hover:text-red-600"
                aria-label="خروج"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Bottom Navigation (mobile only) */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-2xl rounded-t-2xl border-t border-neutral-200 flex justify-around items-center h-20 md:hidden px-2"
        style={{ boxShadow: "0 -8px 32px 0 rgba(80,80,180,0.10)" }}
        aria-label="پیمایش اصلی موبایل"
      >
        {bottomNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center justify-center flex-1 py-2 group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              tabIndex={0}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator */}
              <span
                className={`absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full transition-all duration-200 pointer-events-none ${
                  isActive ? "bg-primary/10" : ""
                }`}
              ></span>
              <link.icon
                className={`relative z-10 w-8 h-8 mb-1 transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-neutral-400 group-hover:text-primary"
                }`}
              />
              <span
                className={`relative z-10 text-sm font-bold transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-neutral-500 group-hover:text-primary"
                }`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Add margin-bottom to page content so it doesn't hide behind nav */}
      <style jsx global>{`
        @media (max-width: 768px) {
          main,
          .min-h-screen,
          .min-h-full,
          .h-full,
          .h-screen {
            margin-bottom: 5.5rem !important;
          }
        }
      `}</style>

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">
              آیا از خروج از حساب کاربری خود مطمئن هستید؟
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                بله، خروج
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-neutral-100 text-neutral-800 rounded-lg hover:bg-neutral-200 transition-colors duration-300"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
