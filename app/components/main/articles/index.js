"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";

const Articles = () => {
  return (
    <div dir="rtl" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {/* Article 1 */}
        <div className="group bg-white rounded-xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
          <div className="p-4 sm:p-5 md:p-6">
            <h3 className="font-bold text-base sm:text-lg md:text-xl text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right mb-2 sm:mb-3">
              نحوه نصب هدلایت خودرو
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right mb-4 sm:mb-5">
              در این مقاله به شما آموزش می‌دهیم چگونه هدلایت خودروی خود را به
              درستی نصب کنید.
            </p>
            <a
              href="/blog/install-headlight"
              className="inline-flex items-center gap-2 text-primary text-sm sm:text-base font-medium hover:text-primary/80 transition-colors duration-300"
            >
              ادامه مطلب
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Article 2 */}
        <div className="group bg-white rounded-xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
          <div className="p-4 sm:p-5 md:p-6">
            <h3 className="font-bold text-base sm:text-lg md:text-xl text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right mb-2 sm:mb-3">
              تعویض فیوز خودرو
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right mb-4 sm:mb-5">
              آموزش گام‌به‌گام تعویض فیوز خودرو به صورت ایمن و سریع.
            </p>
            <a
              href="/blog/replace-fuse"
              className="inline-flex items-center gap-2 text-primary text-sm sm:text-base font-medium hover:text-primary/80 transition-colors duration-300"
            >
              ادامه مطلب
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Article 3 */}
        <div className="group bg-white rounded-xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
          <div className="p-4 sm:p-5 md:p-6">
            <h3 className="font-bold text-base sm:text-lg md:text-xl text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right mb-2 sm:mb-3">
              نگهداری باتری خودرو
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right mb-4 sm:mb-5">
              نکات مهم در نگهداری و افزایش طول عمر باتری خودرو.
            </p>
            <a
              href="/blog/car-battery-maintenance"
              className="inline-flex items-center gap-2 text-primary text-sm sm:text-base font-medium hover:text-primary/80 transition-colors duration-300"
            >
              ادامه مطلب
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Article 4 */}
        <div className="group bg-white rounded-xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
          <div className="p-4 sm:p-5 md:p-6">
            <h3 className="font-bold text-base sm:text-lg md:text-xl text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right mb-2 sm:mb-3">
              تعویض روغن موتور
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right mb-4 sm:mb-5">
              راهنمای کامل تعویض روغن موتور و انتخاب روغن مناسب.
            </p>
            <a
              href="/blog/engine-oil-change"
              className="inline-flex items-center gap-2 text-primary text-sm sm:text-base font-medium hover:text-primary/80 transition-colors duration-300"
            >
              ادامه مطلب
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
