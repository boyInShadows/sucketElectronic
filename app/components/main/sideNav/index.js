"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ImageIcon,
  LayoutGrid,
  Star,
  BookText,
  MessageCircle,
} from "lucide-react";

const navigationItems = [
  {
    id: "slider",
    label: "اسلایدر",
    icon: ImageIcon,
  },
  {
    id: "categories",
    label: "دسته‌بندی محصولات",
    icon: LayoutGrid,
  },
  {
    id: "featured",
    label: "محصولات ویژه",
    icon: Star,
  },
  {
    id: "articles",
    label: "مقالات",
    icon: BookText,
  },
  {
    id: "comments",
    label: "نظرات مشتریان",
    icon: MessageCircle,
  },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("slider");
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    const sections = navigationItems.map((item) => item.id);
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
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
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
                ? "text-accent"
                : "text-neutral-400 hover:text-accent"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-6 h-6" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
