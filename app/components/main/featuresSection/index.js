import React from "react";

const FeaturesSection = ({ features }) => (
  <section id="features" className="w-full py-12 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-primary/5 to-white rounded-2xl border border-neutral-100 hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
          >
            <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300 w-fit">
              {feature.icon}
            </div>
            <h3 className="font-bold text-lg mb-2 text-neutral-800">
              {feature.title}
            </h3>
            <p className="text-base text-neutral-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
