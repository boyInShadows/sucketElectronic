"use client";
import React from "react";
import CartProductComponent from "../cartProductComponent";

const SpecialProductComponent = ({ products }) => {
  return (
    <div dir="rtl" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {products.map((product) => (
          <CartProductComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SpecialProductComponent;
