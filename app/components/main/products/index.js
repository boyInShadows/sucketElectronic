"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Zap, Shield, Truck, Clock } from "lucide-react";
import Slider from "../slider";
import FeaturesSection from "../featuresSection";
import CategoriesSection from "../categoriesSection";
import LatestProductsSection from "../latestProductsSection";

const Products = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Set your desired category ID here
  const latestCategoryId = 1; // Example: 1

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products/");
        if (!response.ok) throw new Error("خطا در دریافت محصولات جدید");
        const data = await response.json();
        // Only keep the last 4 items (newest)
        const latest = data.slice(0, 4);
        console.log("Latest 4 products:", latest);
        setLatestProducts(latest);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

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
      <section id="slider" className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <Slider />
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Latest Products */}
      <LatestProductsSection
        latestProducts={latestProducts}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Products;
