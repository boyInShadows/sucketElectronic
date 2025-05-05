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
  // Construct the full image URL
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:8000${product.image}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-4">
        {/* Product Image */}
        {imageUrl && (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Product Details */}
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-blue-600 font-semibold">${product.price}</p>

        {/* Delete Button - Only shown if onDelete prop is provided */}
        {onDelete && (
          <button
            onClick={() => onDelete(product.id)}
            className="mt-2 text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
