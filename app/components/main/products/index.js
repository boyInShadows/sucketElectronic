import React from "react";
import SliderComponent from "./sliderComponent";
import CategoryProductComponent from "./categoryProductComponent";
import FeaturedProductComponent from "./featuredProductComponent";
import { Zap, Shield, Truck, Clock } from "lucide-react";

const ProductsComponent = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "پریز هوشمند WiFi",
      price: "۲۹۹,۰۰۰",
      image: "/images/img1.jpg",
      category: "پریز هوشمند",
      features: ["کنترل از راه دور", "زمانبندی خودکار", "مصرف انرژی بهینه"],
    },
    {
      id: 2,
      name: "پریز USB شارژر",
      price: "۱۹۹,۰۰۰",
      image: "/images/img2.jpg",
      category: "پریز USB",
      features: ["شارژ سریع", "محافظ ولتاژ", "طراحی مدرن"],
    },
    {
      id: 3,
      name: "پریز زمینی ضد آب",
      price: "۲۴۹,۰۰۰",
      image: "/images/img3.jpg",
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
      icon: <Zap className="w-6 h-6" />,
      title: "کیفیت برتر",
      description: "استانداردهای بین‌المللی",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "گارانتی معتبر",
      description: "۲ سال گارانتی",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "ارسال سریع",
      description: "ارسال در کمتر از ۲۴ ساعت",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "پشتیبانی ۲۴/۷",
      description: "همیشه در خدمت شما",
    },
  ];

  return (
    <div id="products" className="py-12">
      <header className="text-center py-12 font-sans">
        <h1 className="text-4xl font-bold leading-tight text-primary">
          به فروشگاه سوکت امید الکترونیک عزیزخانی خوش آمدید
        </h1>
        <p className="text-lg mt-4 leading-relaxed">
          تولید کننده و تامین کننده انواع سوکت الکترونیک و لوازم برقی، لامپ‌های
          ال‌ای‌دی ، هدلایت و فیوزهای کارتی
        </p>
      </header>

      {/* Hero Slider */}
      <SliderComponent />

      {/* Features Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-3 bg-primary/10 rounded-lg text-primary-light">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-primary-light">
                  {feature.title}
                </h3>
                <p className="text-neutral-light text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <CategoryProductComponent categories={categories} />

      {/* Featured Products */}
      <FeaturedProductComponent products={featuredProducts} />
    </div>
  );
};

export default ProductsComponent;
