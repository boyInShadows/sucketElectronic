import React from "react";
import CardProductComponent from "../products/cartProductComponent";

const LatestProductsSection = ({ latestProducts, loading, error }) => (
  <section
    id="latest-products"
    className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white"
  >
    <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
        تازه ترین محصولات
      </h2>
      {loading ? (
        <div className="text-center py-8">در حال بارگذاری...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : latestProducts.length === 0 ? (
        <div className="text-center py-8 text-red-500">
          هیچ محصولی وجود ندارد
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-stretch">
          {latestProducts.map((product) => (
            <CardProductComponent
              key={product.id}
              product={{
                ...product,
                formatted_price:
                  product.formatted_price ||
                  Number(product.price).toLocaleString(),
              }}
            />
          ))}
        </div>
      )}
    </div>
  </section>
);

export default LatestProductsSection;
