import React from "react";
import CardProductComponent from "../cardProductComponent";

const FeaturedProductComponent = ({ products }) => {
  return (
    <div className="container mx-auto px-4 mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        محصولات ویژه
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <CardProductComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductComponent;
