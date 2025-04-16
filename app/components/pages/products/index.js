"use client";
import React from "react";
import CategoryAccordion from "./categoryAccordion";
import { Search } from "lucide-react";

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

const ProductsPage = () => {
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
        <div className="grid gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryAccordion
              key={category.id}
              category={category}
              products={category.products}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
