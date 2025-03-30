"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "@/app/public/images/img1.jpg";
import img2 from "@/app/public/images/img2.jpg";
import img3 from "@/app/public/images/img3.jpg";
import img4 from "@/app/public/images/img4.jpg";

const slides = [
  {
    id: 1,
    src: img1, // Direct import
    title: "Design Slider",
    topic: "Animal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    src: img2, // Direct import
    title: "Modern UI",
    topic: "Technology",
    description: "Suspendisse commodo ultricies libero, ut venenatis metus.",
  },
  {
    id: 3,
    src: img3,
    title: "Nature Beauty",
    topic: "Landscape",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
  },
  {
    id: 4,
    src: img4,
    title: "Urban Style",
    topic: "City Life",
    description:
      "Donec luctus, massa ac finibus tempor, sapien purus ullamcorper.",
  },
];

export default function ProductSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, i) =>
          i === index ? (
            <motion.div
              key={slide.id}
              className="absolute w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover" }}
                className="absolute inset-0"
              />
              <div className="relative p-8 bg-black bg-opacity-50 text-white rounded-xl max-w-lg text-center">
                <h2 className="text-xl font-bold">{slide.title}</h2>
                <h3 className="text-orange-500 text-lg">{slide.topic}</h3>
                <p className="text-sm mt-2">{slide.description}</p>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-5 bg-gray-800 p-2 rounded-full hover:bg-gray-700"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 bg-gray-800 p-2 rounded-full hover:bg-gray-700"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}
