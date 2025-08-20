"use client";

import { apiUrl } from "../../libs/api";
import React, { useState, useEffect, useCallback } from "react";
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

const Main = () => {
  const [activeSection, setActiveSection] = useState("slider");
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

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
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch(apiUrl("/products/"));
        if (!response.ok) throw new Error("خطا در دریافت محصولات جدید");
        const data = await response.json();
        const latest = data.slice(0, 4);
        setLatestProducts(latest);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(apiUrl("/categories/", {
          headers,
        }));
        if (!response.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setCategoriesError(err.message);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

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
          loading={categoriesLoading}
          error={categoriesError}
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
                loading={loading}
                error={error}
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
                مقالات و اخبار
              </h2>
              <Articles />
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section
          id="contact-us"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-neutral-50"
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
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                سوالات متداول
              </h2>
              <CommonQuestions />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
