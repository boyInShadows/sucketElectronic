"use client";
import React from "react";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

// Sample data - Replace with your actual data
const categories = [
  {
    id: 1,
    name: "پریز هوشمند",
    products: [
      {
        id: 1,
        name: "پریز هوشمند WiFi",
        price: "۲۹۹,۰۰۰",
        image: "/images/usb3.png",
        category: "پریز هوشمند",
      },
      {
        id: 2,
        name: "پریز هوشمند بلوتوث",
        price: "۳۵۹,۰۰۰",
        image: "/images/usb2.jpg",
        category: "پریز هوشمند",
      },
    ],
  },
  {
    id: 2,
    name: "پریز USB",
    products: [
      {
        id: 3,
        name: "پریز USB شارژر",
        price: "۱۹۹,۰۰۰",
        image: "/images/usb3.png",
        category: "پریز USB",
      },
      {
        id: 4,
        name: "پریز USB سریع",
        price: "۲۴۹,۰۰۰",
        image: "/images/usb2.jpg",
        category: "پریز USB",
      },
    ],
  },
  {
    id: 3,
    name: "پریز ضد آب",
    products: [
      {
        id: 5,
        name: "پریز زمینی ضد آب",
        price: "۲۴۹,۰۰۰",
        image: "/images/usb3.png",
        category: "پریز ضد آب",
      },
      {
        id: 6,
        name: "پریز دیواری ضد آب",
        price: "۲۷۹,۰۰۰",
        image: "/images/usb2.jpg",
        category: "پریز ضد آب",
      },
    ],
  },
];

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-neutral-800 mb-4">
        {category.name}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {category.products.slice(0, 2).map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="w-24 h-24 bg-neutral-100 rounded-xl mb-2 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <span className="text-sm text-neutral-600 text-center">
              {product.name}
            </span>
            <span className="text-sm font-medium text-accent mt-1">
              {product.price} تومان
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const { data: session } = useSession();
  const isAdmin =
    session?.user?.role === "super_admin" || session?.user?.role === "ramtin";
  return (
    <div dir="rtl" className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 text-center mb-4 sm:mb-6">
            محصولات
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                className="w-full pr-12 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
          {/* Add New Category Button - Only visible to super admins */}
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 hover:border-accent group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Plus className="w-6 h-6 text-accent" />
              </div>
              <span className="text-neutral-600 font-medium">
                افزودن دسته‌بندی جدید
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
