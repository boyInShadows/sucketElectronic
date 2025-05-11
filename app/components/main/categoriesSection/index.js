import React from "react";
import CategoryProductComponent from "../categoryProductComponent";

const CategoriesSection = ({ categories, loading, error }) => (
  <section
    id="categories"
    className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-neutral-50"
  >
    <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
        دسته‌بندی محصولات
      </h2>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <CategoryProductComponent categories={categories} />
      )}
    </div>
  </section>
);

export default CategoriesSection;
