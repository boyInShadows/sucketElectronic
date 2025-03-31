import React from "react";
import Image from "next/image";
import SliderComponent from "./sliderComponent";
import CategoryProductComponent from "./categoryProductComponent";
import SpecialProductComponent from "./specialProductComponent";
import HeaderComponent from "./headerComponent";
import { Zap, Shield, Truck, Clock } from "lucide-react";

// Import images
import usb1 from "@/app/public/images/usb3.png";
import usb2 from "@/app/public/images/usb2.jpg";
import usb3 from "@/app/public/images/usb3.png";

const ProductsComponent = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "پریز هوشمند WiFi",
      price: "۲۹۹,۰۰۰",
      image: usb1,
      category: "پریز هوشمند",
      features: ["کنترل از راه دور", "زمانبندی خودکار", "مصرف انرژی بهینه"],
    },
    {
      id: 2,
      name: "پریز USB شارژر",
      price: "۱۹۹,۰۰۰",
      image: usb2,
      category: "پریز USB",
      features: ["شارژ سریع", "محافظ ولتاژ", "طراحی مدرن"],
    },
    {
      id: 3,
      name: "پریز زمینی ضد آب",
      price: "۲۴۹,۰۰۰",
      image: usb3,
      category: "پریز ضد آب",
      features: ["مقاوم در برابر آب", "محافظ کودک", "نصب آسان"],
    },
  ];

  const categories = [
    { id: 1, name: "پریز هوشمند", count: 12 },
    { id: 2, name: "پریز USB", count: 8 },
    { id: 3, name: "پریز ضد آب", count: 6 },
    { id: 4, name: "پریز صنعتی", count: 4 },
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "کیفیت برتر",
      description: "استانداردهای بین‌المللی",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "گارانتی معتبر",
      description: "۲ سال گارانتی",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "ارسال سریع",
      description: "ارسال در کمتر از ۲۴ ساعت",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "پشتیبانی ۲۴/۷",
      description: "همیشه در خدمت شما",
    },
  ];

  return (
    <div id="products" className="bg-neutral-50">
      {/* Header Section */}
      <HeaderComponent />

      {/* Hero Slider */}
      <div className="container mx-auto px-4 py-12">
        <SliderComponent />
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="mb-4 p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-neutral-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <CategoryProductComponent categories={categories} />
      </div>

      {/* Featured Products */}
      <SpecialProductComponent products={featuredProducts} />
    </div>
  );
};

export default ProductsComponent;
