import React from "react";
import SliderComponent from "./sliderComponent";

const ProductsComponent = () => {
  return (
    <div id="products" className="py-12">
      <SliderComponent />
      {/* <h2 className="text-2xl font-bold text-center mb-8">محصولات پرفروش</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div> */}
    </div>
  );
};

export default ProductsComponent;
