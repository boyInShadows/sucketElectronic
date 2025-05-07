"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, Search, User, LogOut } from "lucide-react";

// Images
import Logo from "@/app/public/images/Logo2.png";

const Header = () => {
  const router = useRouter();
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

  const navLinks = [
    { name: "تماس با ما", href: "/contact" },
    { name: "درباره ما", href: "/about" },
    { name: "محصولات", href: "/products" },
    { name: "صفحه اصلی", href: "/" },
  ];

  // Add users link if logged in and is admin
  const allNavLinks =
    username && isAdmin
      ? [...navLinks, { name: "مدیریت کاربران", href: "/users" }]
      : navLinks;

  return (
    <header className="bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm border-b border-neutral-200">
      <div className=" mx-auto flex items-center justify-around h-16 sm:h-20 px-4">
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

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-x-8">
          {allNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-base text-neutral-700 hover:text-primary transition-colors duration-200 px-2 py-1"
            >
              <span className="relative z-10">{link.name}</span>
              {/* <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-200" /> */}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center bg-white/80 border border-neutral-200 rounded-full px-2 py-1 gap-x-1 shadow backdrop-blur-sm">
          <button
            className="p-2 rounded-full hover:bg-primary/10 focus:bg-primary/20 transition-colors duration-200 text-neutral-700 hover:text-primary"
            aria-label="جستجو"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link
            href={username ? "/" : "/login"}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-neutral-700 hover:text-primary transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="منو"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/"
              className="text-xl font-bold text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              امید الکترونیک
            </Link>
            <button
              className="p-2 text-neutral-700 hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
              aria-label="بستن منو"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-4">
            {allNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-base text-neutral-700 hover:text-primary transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-center space-x-6 pt-8 border-t border-neutral-200">
            <button
              className="p-2 text-neutral-700 hover:text-primary transition-colors duration-300"
              aria-label="جستجو"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-neutral-700 hover:text-primary transition-colors duration-300"
              aria-label="سبد خرید"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
              <Link
                href={username ? "/" : "/login"}
                className="flex flex-col items-center p-2 text-neutral-700 hover:text-primary transition-colors duration-300"
                aria-label="حساب کاربری"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                {username && (
                  <span className="text-xs mt-1 text-neutral-800">
                    {username}
                  </span>
                )}
              </Link>
              {username && (
                <button
                  onClick={() => setShowLogoutPopup(true)}
                  className="p-2 text-neutral-700 hover:text-primary transition-colors duration-300"
                  aria-label="خروج"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

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
    </header>
  );
};

export default Header;
