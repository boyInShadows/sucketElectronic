import React from "react";
import { ShoppingCart, User, Search } from "lucide-react";

const HeaderComponent = () => {
  return (
    <header className="sticky z-10 top-0 bg-white shadow-md" dir="rtl">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* User Actions (Right Side for Persian UX) */}
        <div className="text-2xl font-bold text-black">لوگو</div>

        {/* Search Bar (Centered) */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary text-right"
          />
          <Search className="absolute left-3 top-3 text-dark-gray" size={20} />
        </div>

        {/* Navigation (Left Side for Persian UX) */}
        <nav className="hidden md:flex gap-6 ">
          <a href="#" className="hover:text-primary transition text-dark-gray">
            خانه
          </a>
          <a href="#" className="hover:text-primary transition text-dark-gray">
            درباره ما
          </a>
          <a href="#" className="hover:text-primary transition text-dark-gray">
            تماس با ما
          </a>
        </nav>

        {/* Logo (Left Side) */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 text-dark-gray">
            <User size={20} /> ورود | ثبت‌نام
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-zinc-700 text-white px-4 py-2 rounded-md">
            <ShoppingCart size={20} /> سبد خرید
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
