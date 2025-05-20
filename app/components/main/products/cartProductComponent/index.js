import React from "react";
import Image from "next/image";

const CardProductComponent = ({ product }) => {
  // Ensure features is always an array
  let featuresArray = [];
  if (Array.isArray(product.features)) {
    featuresArray = product.features;
  } else if (typeof product.features === "string" && product.features) {
    featuresArray = product.features.split(",").map((f) => f.trim());
  }

  return (
    <div className="relative flex flex-col items-center">
      <span className="absolute -top-4 -left-4 z-20 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg border-2 border-white">
        جدید
      </span>
      <div
        className="group bg-white rounded-2xl border border-neutral-200 hover:shadow-xl shadow-md transition-all duration-300 overflow-hidden p-0 flex flex-col items-stretch w-full"
        dir="rtl"
      >
        <div className="relative h-48 md:h-56 w-full flex items-center justify-center bg-neutral-50">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400 text-2xl">
              بدون تصویر
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-lg md:text-xl text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right truncate">
                {product.name}
              </h3>
              <span className="text-primary font-bold text-base text-right bg-primary/10 px-3 py-1 rounded-lg">
                {product.formatted_price} تومان
              </span>
            </div>
            <div className="text-xs text-neutral-500 mb-2 text-right">
              {typeof product.category === "object"
                ? product.category.name
                : product.category}
            </div>
            <ul className="space-y-2 mb-2">
              {featuresArray.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-neutral-600 text-right"
                >
                  <span className="w-1 h-1 bg-primary/50 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductComponent;
