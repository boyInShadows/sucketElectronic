import React from "react";

const CategoryProductComponent = ({ categories }) => {
  return (
    <div className="container mx-auto px-4 mt-24">
      <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
        دسته‌بندی محصولات
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group flex flex-col items-center text-center p-8 bg-white rounded-xl border border-secondary-dark/5 hover:border-primary/20 transition-all duration-300 cursor-pointer"
          >
            <h3 className="font-bold text-lg mb-2 text-neutral group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-base text-neutral-light">
              {category.count} محصول
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductComponent;
