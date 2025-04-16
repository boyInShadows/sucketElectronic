"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "صفحه اصلی", href: "/" },
    { name: "محصولات", href: "/products" },
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              امید الکترونیک
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm lg:text-base text-neutral-700 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
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
            <button
              className="p-2 text-neutral-700 hover:text-primary transition-colors duration-300"
              aria-label="حساب کاربری"
            >
              <User className="w-5 h-5" />
            </button>
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
              {navLinks.map((link) => (
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
              <button
                className="p-2 text-neutral-700 hover:text-primary transition-colors duration-300"
                aria-label="حساب کاربری"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
