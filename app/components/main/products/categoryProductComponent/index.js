import React from "react";

const CategoryProductComponent = ({ categories }) => {
  return (
    <div className="container mx-auto px-4 mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        دسته‌بندی محصولات
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2 text-primary-light">
                {category.name}
              </h3>
              <p className="text-neutral-light text-sm">
                {category.count} محصول
              </p>
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductComponent;
