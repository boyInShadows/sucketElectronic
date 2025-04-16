"use client";
import React from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu } from "lucide-react";

const HeaderComponent = () => {
  return (
    <header dir="rtl" className="w-full bg-white border-b border-neutral-100">
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-primary"
            >
              عزیزخانی
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="text-sm lg:text-base font-medium text-neutral-800 hover:text-primary transition-colors duration-300"
            >
              خانه
            </Link>
            <Link
              href="/products"
              className="text-sm lg:text-base font-medium text-neutral-800 hover:text-primary transition-colors duration-300"
            >
              محصولات
            </Link>
            <Link
              href="/blog"
              className="text-sm lg:text-base font-medium text-neutral-800 hover:text-primary transition-colors duration-300"
            >
              وبلاگ
            </Link>
            <Link
              href="/contact"
              className="text-sm lg:text-base font-medium text-neutral-800 hover:text-primary transition-colors duration-300"
            >
              تماس با ما
            </Link>
          </nav>

          {/* Search and Cart - Desktop */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <button
              className="p-2 text-neutral-600 hover:text-primary transition-colors duration-300"
              aria-label="جستجو"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-neutral-600 hover:text-primary transition-colors duration-300"
              aria-label="سبد خرید"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-600 hover:text-primary transition-colors duration-300"
            aria-label="منو"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
