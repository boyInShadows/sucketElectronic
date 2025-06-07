"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "@/app/public/images/img1.jpg";
import img2 from "@/app/public/images/img2.jpg";
import img3 from "@/app/public/images/img3.jpg";
import img4 from "@/app/public/images/img4.jpg";
import img5 from "@/app/public/images/img5.jpg";

const slides = [
  {
    id: 1,
    src: img1,
    title: "تخصصی‌ترین سوکت‌های الکترونیک خودرو با کیفیت و تضمین قیمت",
    topic: "کیفیت",
    description:
      "امید الکترونیک: ارائه‌دهنده برترین برندهای داخلی و خارجی برای تمامی مدل‌های ماشین",
  },
  {
    id: 2,
    src: img2,
    title: "سوکت‌های اورجینال، نصب مطمئن، طول عمر بالا",
    topic: "اصالت",
    description:
      "با اعتماد به امید الکترونیک عزیز خانی، قطعات را هوشمندانه انتخاب کنید!",
  },
  {
    id: 3,
    src: img3,
    title: "پخش عمده و تکی سوکت خودرو – مشاوره رایگان قبل از خرید",
    topic: "تنوع",
    description: "تنوع بی‌نظیر، قیمت رقابتی، خدمات پس از فروش حرفه‌ای",
  },
  {
    id: 4,
    src: img4,
    title: "مرکز تخصصی سوکت و کانکتورهای الکترونیک خودرو",
    topic: "تخصص",
    description: "از پروژه‌های سفارشی تا قطعات استاندارد، همراه شما هستیم.",
  },
  {
    id: 5,
    src: img5,
    title: "امید الکترونیک: اتصالی مطمئن برای سیستم برق خودروی شما",
    topic: "اتصال",
    description: "با ده‌ها سال تجربه، ضامن کیفیت و دوام قطعات.",
  },
];

export default function ProductSlider() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Swipe handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide(); // swipe left
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // swipe right
    }
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl bg-black"
      style={{ touchAction: "pan-y" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
        {slides.map((slide, i) =>
          i === index ? (
            <motion.div
              key={slide.id}
              className="absolute w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                style={{ objectFit: "cover" }}
                className="absolute inset-0"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent" />

              {/* Content */}
              <div className="relative h-full flex items-center justify-start px-2 sm:px-8 md:px-12 lg:px-24">
                <motion.div
                  className="max-w-[200px] sm:max-w-md md:max-w-2xl lg:max-w-3xl text-white text-right"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className="inline-block px-2 py-0.5 sm:px-4 sm:py-1.5 bg-accent/90 text-white rounded-full text-[10px] sm:text-sm font-medium mb-1 sm:mb-4">
                    {slide.topic}
                  </span>
                  <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-4 font-display leading-tight ">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white/90 font-body leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {slide.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Navigation Buttons - Only show on sm+ */}
      <button
        onClick={nextSlide}
        className="absolute left-2 sm:left-4 bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>
      <button
        onClick={prevSlide}
        className="absolute right-2 sm:right-4 bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Thumbnail Preview - Hidden on mobile */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 hidden sm:flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        {slides.map((slide, i) => (
          <motion.button
            key={i}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setIndex(i);
              }
            }}
            className={`relative w-12 h-8 sm:w-16 sm:h-12 rounded-lg overflow-hidden transition-all duration-300 ${
              i === index
                ? "ring-2 ring-white scale-110"
                : "opacity-50 hover:opacity-75"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              sizes="(max-width: 640px) 48px, 64px"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.button>
        ))}
      </motion.div>

      {/* Slide Progress - Enhanced for mobile */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        {slides.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "bg-white w-6 sm:w-8" : "bg-white/30 w-1.5 sm:w-2"
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
}
