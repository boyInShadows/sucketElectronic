import React from "react";
import { ShoppingCart, User, Search } from "lucide-react";

const HeaderComponent = () => {
  return (
    <header
      className="sticky z-10 top-0 bg-white/80 backdrop-blur-md shadow-md border-b border-secondary-dark/5"
      dir="rtl"
    >
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-3xl font-bold text-primary hover:text-primary-light transition-colors duration-300 cursor-pointer tracking-normal font-display">
          لوگو
        </div>

        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            className="w-full px-4 py-2.5 border border-secondary-dark/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right text-base font-normal placeholder:text-neutral-light/70 transition-all duration-300 font-body"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light/70"
            size={20}
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          <a
            href="#"
            className="text-neutral hover:text-primary transition-colors duration-300 font-medium text-base tracking-normal font-body"
          >
            خانه
          </a>
          <a
            href="#"
            className="text-neutral hover:text-primary transition-colors duration-300 font-medium text-base tracking-normal font-body"
          >
            درباره ما
          </a>
          <a
            href="#"
            className="text-neutral hover:text-primary transition-colors duration-300 font-medium text-base tracking-normal font-body"
          >
            تماس با ما
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-secondary-dark/20 px-4 py-2 rounded-lg hover:bg-secondary hover:border-primary/20 text-neutral font-medium text-base tracking-normal transition-all duration-300 font-body">
            <User size={20} /> ورود | ثبت‌نام
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg font-medium text-base tracking-normal transition-all duration-300 font-body">
            <ShoppingCart size={20} /> سبد خرید
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
