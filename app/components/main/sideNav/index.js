"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ImageIcon,
  LayoutGrid,
  Star,
  BookText,
  MessageCircle,
  Phone,
  HelpCircle,
  Layers,
  PackageSearch,
  Sparkles,
} from "lucide-react";

const navigationItems = [
  {
    id: "slider",
    label: "اسلایدر",
    icon: ImageIcon,
  },
  {
    id: "features",
    label: "ویژگی‌ها",
    icon: Sparkles,
  },
  {
    id: "categories",
    label: "دسته‌بندی‌ها",
    icon: LayoutGrid,
  },
  {
    id: "latest-products",
    label: "جدیدترین محصولات",
    icon: PackageSearch,
  },
  {
    id: "articles",
    label: "مقالات",
    icon: BookText,
  },
  {
    id: "contact-us",
    label: "تماس با ما",
    icon: Phone,
  },
  {
    id: "common-questions",
    label: "سوالات متداول",
    icon: HelpCircle,
  },
];

export default function SideNav({ activeSection, onSectionClick }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-8 top-1/3 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="flex flex-col items-center gap-6">
        {navigationItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative group p-2 rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? "text-accent bg-accent/10"
                : "text-neutral-400 hover:text-accent hover:bg-accent/5"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-6 h-6" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-neutral-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
