"use client";
import React from "react";
import Link from "next/link";
import {
  Home,
  ShoppingCart,
  BookOpen,
  Phone,
  Instagram,
  MessageCircle,
  MessageSquare,
  ChevronLeft,
  Star,
} from "lucide-react";

const SideNav = () => {
  const quickLinks = [
    { icon: <Home className="w-4 h-4" />, label: "خانه", href: "/" },
    {
      icon: <ShoppingCart className="w-4 h-4" />,
      label: "محصولات",
      href: "/products",
    },
    { icon: <BookOpen className="w-4 h-4" />, label: "وبلاگ", href: "/blog" },
    {
      icon: <Phone className="w-4 h-4" />,
      label: "تماس با ما",
      href: "/contact",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "پریز هوشمند WiFi",
      price: "۲۹۹,۰۰۰",
      image: "/images/usb3.png",
    },
    {
      id: 2,
      name: "پریز USB شارژر",
      price: "۱۹۹,۰۰۰",
      image: "/images/usb2.jpg",
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-4 h-4" />, label: "اینستاگرام", href: "#" },
    { icon: <MessageCircle className="w-4 h-4" />, label: "تلگرام", href: "#" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "واتساپ", href: "#" },
  ];

  return (
    <div
      dir="rtl"
      className="hidden lg:block w-64 bg-white border-r border-neutral-100 h-screen sticky top-0"
    >
      <div className="h-full flex flex-col justify-between p-4">
        <div>
          {/* Quick Links */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-500 mb-3">
              دسترسی سریع
            </h3>
            <div className="space-y-1.5">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center gap-2 p-2 rounded-lg text-neutral-700 hover:bg-primary/5 hover:text-primary transition-colors duration-300"
                >
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-500 mb-3">
              محصولات ویژه
            </h3>
            <div className="space-y-3">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-neutral-50 rounded-lg p-2 hover:bg-primary/5 transition-colors duration-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-neutral-800 group-hover:text-primary transition-colors duration-300">
                        {product.name}
                      </h4>
                      <p className="text-xs text-primary font-medium">
                        {product.price} تومان
                      </p>
                    </div>
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-500 mb-3">
              اطلاعات تماس
            </h3>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                <span>info@example.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-3">
              شبکه‌های اجتماعی
            </h3>
            <div className="flex items-center gap-2">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="p-1.5 rounded-lg bg-neutral-50 text-neutral-700 hover:bg-primary/5 hover:text-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
