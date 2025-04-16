"use client";
import React from "react";
import Products from "./products";
import Articles from "./articles";
import Comments from "./comments";
import SideNav from "./sideNav";

const Main = () => {
  return (
    <div className="flex">
      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Products Section */}
        <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <Products />
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                مقالات و اخبار
              </h2>
              <Articles />
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="max-w-[95%] mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
                نظرات مشتریان
              </h2>
              <Comments />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
