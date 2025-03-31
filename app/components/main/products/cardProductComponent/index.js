import React from "react";
import Image from "next/image";

const CardProductComponent = ({ product }) => {
  return (
    <div
      className="group bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
      dir="rtl"
    >
      <div className="relative h-56">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
          {product.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right">
            {product.name}
          </h3>
          <p className="text-primary font-bold text-base text-right">
            {product.price} تومان
          </p>
        </div>
        <ul className="space-y-2.5 mb-5">
          {product.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-neutral-600 text-right"
            >
              <span className="w-1 h-1 bg-primary/50 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
        <button className="w-full bg-primary/95 text-white py-2 rounded-xl hover:bg-primary transition-colors duration-300 font-medium text-sm text-center shadow-sm hover:shadow-md">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
};

export default CardProductComponent;
