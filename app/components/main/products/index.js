"use client";
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

const Products = () => {
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
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "کیفیت برتر",
      description: "استانداردهای بین‌المللی",
    },
    {
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "گارانتی معتبر",
      description: "۲ سال گارانتی",
    },
    {
      icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "ارسال سریع",
      description: "ارسال در کمتر از ۲۴ ساعت",
    },
    {
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "پشتیبانی ۲۴/۷",
      description: "همیشه در خدمت شما",
    },
  ];

  return (
    <div dir="rtl" className="w-full bg-neutral-50">
      {/* Header Section */}
      {/* <HeaderComponent /> */}

      {/* Hero Slider */}
      <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <SliderComponent />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 bg-white">
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
                <p className="text-base text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
            دسته‌بندی محصولات
          </h2>
          <CategoryProductComponent categories={categories} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
            محصولات ویژه
          </h2>
          <SpecialProductComponent products={featuredProducts} />
        </div>
      </section>
    </div>
  );
};

export default Products;
