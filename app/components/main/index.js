"use client";
import React, { useState, useEffect, useCallback } from "react";
import Products from "./products";
import Articles from "./articles";
import Comments from "./comments";
import SideNav from "./sideNav";
import CustomNeshanMap from "../neshanMap";
import ContactUs from "./contactUs";
import CommonQuestions from "./commonQuestions";

const Main = () => {
  const [activeSection, setActiveSection] = useState("slider");

  const handleScroll = useCallback(() => {
    const sections = [
      "slider",
      "categories",
      "featured",
      "articles",
      "comments",
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
        {/* Products Section */}
        <section id="slider" className="w-full py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <Products />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section
          id="categories"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-neutral-50"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                دسته‌بندی محصولات
              </h2>
              {/* Add your categories component here */}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section
          id="featured"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                محصولات ویژه
              </h2>
              {/* Add your featured products component here */}
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

        {/* Comments Section */}
        {/* <section
          id="comments"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                نظرات مشتریان
              </h2>
              <Comments />
            </div>
          </div>
        </section> */}

        {/* Contact Us Section */}
        <section
          id="contact-us"
          className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-neutral-50"
        >
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                تماس با ما
              </h2>
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

        {/* Map Section */}
        <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                آدرس ما
              </h2>
              <CustomNeshanMap />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
