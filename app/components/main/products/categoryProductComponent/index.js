"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";

const CategoryProductComponent = () => {
  const categories = [
    { id: 1, name: "پریز هوشمند", count: 12 },
    { id: 2, name: "پریز USB", count: 8 },
    { id: 3, name: "پریز ضد آب", count: 6 },
    { id: 4, name: "پریز صنعتی", count: 4 },
    { id: 5, name: "پریز زمینی", count: 10 },
    { id: 6, name: "پریز دیواری", count: 15 },
  ];

  return (
    <div dir="rtl" className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group bg-white rounded-xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
          >
            <div className="p-3 sm:p-4 md:p-5">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-neutral-800 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
                <span className="text-xs sm:text-sm text-neutral-500 bg-neutral-50 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </div>
              <a
                href={`/category/${category.id}`}
                className="inline-flex items-center gap-1 text-primary text-xs sm:text-sm font-medium hover:text-primary/80 transition-colors duration-300"
              >
                مشاهده محصولات
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductComponent;
