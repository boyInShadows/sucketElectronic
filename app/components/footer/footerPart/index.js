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

const FooterComponent = () => {
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
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com",
    },
    {
      name: "تلگرام",
      icon: <MessageCircle className="w-5 h-5" />,
      href: "https://telegram.org",
    },
    {
      name: "واتساپ",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "https://whatsapp.com",
    },
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      text: "۰۹۱۲-۱۲۳-۴۵۶۷",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: "info@omid-electronic.ir",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    },
  ];

  return (
    <footer className="bg-neutral-900 text-white" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-right">دسترسی سریع</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name} className="text-right">
                    <Link
                      href={link.href}
                      className="text-neutral-300 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-right">
                اطلاعات تماس
              </h3>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-right"
                  >
                    <span className="text-primary">{item.icon}</span>
                    <span className="text-neutral-300 text-sm">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-right">
                شبکه‌های اجتماعی
              </h3>
              <div className="flex gap-4 justify-start">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-800 p-2 rounded-lg hover:bg-primary transition-colors duration-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-right">خبرنامه</h3>
              <p className="text-neutral-300 text-sm mb-4 text-right">
                برای دریافت آخرین اخبار و تخفیف‌ها عضو شوید
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="flex-1 p-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm text-right"
                />
                <button
                  type="submit"
                  className="bg-primary/95 text-white px-4 rounded-lg hover:bg-primary transition-colors duration-300 text-sm"
                >
                  عضویت
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
            <p className="text-neutral-400 text-sm">
              © {currentYear} فروشگاه سوکت امید الکترونیک عزیزخانی. تمامی حقوق
              محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
