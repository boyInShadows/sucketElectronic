"use client";
import React from "react";
import { Star } from "lucide-react";

const Comments = () => {
  return (
    <div dir="rtl" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Comment 1 */}
        <div className="bg-white rounded-xl border border-neutral-100 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg sm:text-xl">
                م
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-neutral-800">
                محمد رضایی
              </h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right">
            محصولات با کیفیت و قیمت مناسب. پشتیبانی عالی و تحویل سریع. بسیار
            راضی هستم.
          </p>
        </div>

        {/* Comment 2 */}
        <div className="bg-white rounded-xl border border-neutral-100 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg sm:text-xl">
                ع
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-neutral-800">
                علی محمدی
              </h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right">
            تجربه خرید بسیار خوبی بود. محصولات با کیفیت و بسته‌بندی مناسب.
            پیشنهاد می‌کنم.
          </p>
        </div>

        {/* Comment 3 */}
        <div className="bg-white rounded-xl border border-neutral-100 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg sm:text-xl">
                ف
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-neutral-800">
                فاطمه احمدی
              </h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right">
            خدمات پس از فروش عالی و پاسخگویی سریع. کیفیت محصولات در حد انتظار
            بود.
          </p>
        </div>

        {/* Comment 4 */}
        <div className="bg-white rounded-xl border border-neutral-100 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg sm:text-xl">
                ر
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-neutral-800">
                رضا حسینی
              </h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right">
            قیمت‌ها مناسب و کیفیت محصولات خوب است. تحویل به موقع و بسته‌بندی
            مناسب.
          </p>
        </div>

        {/* Comment 5 */}
        <div className="bg-white rounded-xl border border-neutral-100 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg sm:text-xl">
                س
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-neutral-800">
                سارا محمدی
              </h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right">
            تنوع محصولات خوب و قیمت‌ها مناسب است. پشتیبانی سریع و پاسخگو.
          </p>
        </div>

        {/* Comment 6 */}
        <div className="bg-white rounded-xl border border-neutral-100 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg sm:text-xl">
                م
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-neutral-800">
                مریم کریمی
              </h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-right">
            کیفیت محصولات عالی و قیمت‌ها مناسب است. تحویل سریع و بسته‌بندی خوب.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
