"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs sm:text-sm rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-base sm:text-lg text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg sm:text-xl font-bold text-primary">
            {product.price} تومان
          </span>
          <button className="p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors duration-300">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
