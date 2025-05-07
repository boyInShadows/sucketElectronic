"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * ProductCard Component
 * Displays individual product information in a card format
 *
 * @param {Object} props
 * @param {Object} props.product - The product data to display
 * @param {Function} props.onDelete - Optional callback for delete functionality
 */
const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 w-full">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 font-vazirmatn">بدون تصویر</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 font-vazirmatn text-[#1E3A8A]">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 font-vazirmatn line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-[#1E3A8A] font-bold font-vazirmatn">
            {product.price.toLocaleString()} تومان
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(product.id)}
              className="text-red-500 hover:text-red-600 transition-colors font-vazirmatn text-sm"
            >
              حذف
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
