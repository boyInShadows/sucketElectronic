"use client";
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const FooterPart = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "صفحه اصلی", href: "/" },
    { name: "محصولات", href: "/products" },
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "اینستاگرام",
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://instagram.com",
    },
    {
      name: "تلگرام",
      icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://telegram.org",
    },
    {
      name: "واتساپ",
      icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://whatsapp.com",
    },
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: "۰۹۱۲-۱۲۳-۴۵۶۷",
    },
    {
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: "info@omid-electronic.ir",
    },
    {
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    },
  ];

  return (
    <footer className="bg-neutral-900 text-white w-full" dir="rtl">
      <div className="w-full px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 md:py-12">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Quick Links */}
            <div className="order-1">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-right">
                دسترسی سریع
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name} className="text-right">
                    <Link
                      href={link.href}
                      className="text-neutral-300 hover:text-primary transition-colors duration-300 text-sm block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="order-2">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-right">
                اطلاعات تماس
              </h3>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-right"
                  >
                    <span className="text-primary flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-neutral-300 text-sm">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="order-3">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-right">
                شبکه‌های اجتماعی
              </h3>
              <div className="flex gap-4 justify-end">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-800 p-2 rounded-lg hover:bg-primary transition-colors duration-300"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="order-4">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-right">
                خبرنامه
              </h3>
              <p className="text-neutral-300 text-sm mb-4 text-right">
                برای دریافت آخرین اخبار و تخفیف‌ها عضو شوید
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="flex-1 p-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm text-right"
                  aria-label="ایمیل"
                />
                <button
                  type="submit"
                  className="bg-primary/95 text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-300 text-sm whitespace-nowrap"
                >
                  عضویت
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-neutral-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
            <p className="text-neutral-400 text-xs sm:text-sm">
              © {currentYear} فروشگاه سوکت امید الکترونیک عزیزخانی. تمامی حقوق
              محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPart;
