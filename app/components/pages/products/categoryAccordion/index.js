"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "../productCard";

const CategoryAccordion = ({ category, products }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border border-neutral-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 md:p-6 flex items-center justify-between bg-white hover:bg-neutral-50 transition-colors duration-300"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-lg sm:text-xl">
            {category.name.charAt(0)}
          </span>
          <div className="text-right">
            <h3 className="font-bold text-base sm:text-lg md:text-xl text-neutral-800">
              {category.name}
            </h3>
            <p className="text-sm sm:text-base text-neutral-500">
              {products.length} محصول
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-neutral-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-500" />
        )}
      </button>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-5 md:p-6 bg-neutral-50 transition-all duration-300 ${
          isOpen ? "max-h-[2000px]" : "max-h-0"
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryAccordion;
