import React from "react";
import CardProductComponent from "../cardProductComponent";

const FeaturedProductComponent = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12 text-neutral-800">
          محصولات ویژه
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <CardProductComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductComponent;
