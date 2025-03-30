import React from "react";

const CardProductComponent = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{product.name}</h3>
        <p className="text-primary font-bold text-lg mb-4">
          {product.price} تومان
        </p>
        <ul className="space-y-2 mb-4">
          {product.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-neutral-light"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
};

export default CardProductComponent;
