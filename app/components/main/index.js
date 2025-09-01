"use client";

import { apiUrl } from "../../libs/api";
import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/app/context/LoadingContext";
import Articles from "./articles";
import SideNav from "./sideNav";
import CustomNeshanMap from "../neshanMap";
import ContactUs from "./contactUs";
import CommonQuestions from "./commonQuestions";
import { Zap, Shield, Truck, Clock } from "lucide-react";
import Slider from "./slider";
import FeaturesSection from "./featuresSection";
import CategoriesSection from "./categoriesSection";
import LatestProductsSection from "./latestProductsSection";
import SectionLoading from "../loadingSamples/SectionLoading";

const Main = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("slider");
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const { setLoading, setError, clearError } = useLoading();

  const handleScroll = useCallback(() => {
    const sections = [
      "slider",
      "features",
      "categories",
      "latest-products",
      "articles",
      "contact-us",
      "common-questions",
    ];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Only fetch and set loading states on home page
    if (pathname !== '/') return;

    const fetchLatestProducts = async () => {
      try {
        setLoading('products', true);
        clearError('products');
        
        const response = await fetch(apiUrl("/products/"));
        if (!response.ok) throw new Error("خطا در دریافت محصولات جدید");
        const data = await response.json();
        const latest = data.slice(0, 4);
        setLatestProducts(latest);
        
        setLoading('products', false);
      } catch (err) {
        setError('products', err.message);
        setLoading('products', false);
      }
    };
    fetchLatestProducts();
  }, [pathname, setLoading, setError, clearError]);

  useEffect(() => {
    // Only fetch and set loading states on home page
    if (pathname !== '/') return;

    const fetchCategories = async () => {
      try {
        setLoading('mainContent', true);
        clearError('mainContent');
        
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(apiUrl("/categories/"), {
          headers,
        });
        if (!response.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");
        const data = await response.json();
        setCategories(data);
        
        setLoading('mainContent', false);
      } catch (err) {
        setError('mainContent', err.message);
        setLoading('mainContent', false);
      }
    };
    fetchCategories();
  }, [pathname, setLoading, setError, clearError]);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "کیفیت بالا",
      description: "محصولات با کیفیت و قابل اعتماد",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "گارانتی معتبر",
      description: "گارانتی کامل برای تمام محصولات",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "ارسال سریع",
      description: "ارسال در کمترین زمان ممکن",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "پشتیبانی 24/7",
      description: "پشتیبانی شبانه‌روزی",
    },
  ];

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="flex">
      {/* Side Navigation */}
      <SideNav activeSection={activeSection} onSectionClick={scrollToSection} />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Slider Section */}
        <section id="slider" className="w-full py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <Slider />
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section
          id="features"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[100%] mx-auto">
              <FeaturesSection features={features} />
            </div>
          </div>
        </section>
        {/* Categories Section */}
        <CategoriesSection
          categories={categories}
          loading={false} // Categories are now fetched directly
          error={null} // Categories are now fetched directly
        />
        {/* Latest Products Section */}
        <section
          id="latest-products"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <LatestProductsSection
                latestProducts={latestProducts}
                loading={false} // Products are now fetched directly
                error={null} // Products are now fetched directly
              />
            </div>
          </div>
        </section>
        {/* Articles Section */}
        <section
          id="articles"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-neutral-50"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                مقالات
              </h2>
              <Articles />
            </div>
          </div>
        </section>
        {/* Contact Us Section */}
        <section
          id="contact-us"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <ContactUs />
            </div>
          </div>
        </section>
        {/* Common Questions Section */}
        <section
          id="common-questions"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-neutral-50"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <CommonQuestions />
            </div>
          </div>
        </section>
      </main>

      {/* Map Section */}
      <CustomNeshanMap />
    </div>
  );
};

export default Main;
