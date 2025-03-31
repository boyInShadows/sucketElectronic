"use client";
import React from "react";

const HeaderComponent = () => {
  return (
    <header className="relative py-16 my-16 bg-white rounded-lg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative Line */}
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full" />

          {/* Main Heading */}
          <div className="w-full overflow-hidden">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-display leading-tight inline-block">
              به فروشگاه سوکت امید الکترونیک عزیزخانی خوش آمدید
            </h1>
          </div>

          {/* Description */}
          <div className="relative">
            <p className="text-base md:text-lg text-neutral font-body leading-relaxed max-w-2xl mx-auto">
              تولید کننده و تامین کننده انواع سوکت الکترونیک و لوازم برقی،
              لامپ‌های ال‌ای‌دی ، هدلایت و فیوزهای کارتی
            </p>
          </div>

          {/* Bottom Line */}
          <div className="w-32 h-0.5 bg-primary/20 mx-auto mt-6 rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
