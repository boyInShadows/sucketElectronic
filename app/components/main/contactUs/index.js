"use client";
import React from "react";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Linkedin,
  Facebook,
  User,
  AtSign,
  MessageSquare,
} from "lucide-react";
import CustomNeshanMap from "../../neshanMap";

const ContactUsComponent = () => {
  return (
    <section
      id="contact-us"
      className="bg-gradient-to-b from-neutral-50 to-white py-12"
    >
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-3">
            ارتباط با ما
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg">
            سوال، پیشنهاد یا نیاز به مشاوره دارید؟ فرم زیر را پر کنید یا از
            راه‌های زیر با ما تماس بگیرید.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white rounded-3xl shadow-lg border border-neutral-100 p-6 md:p-10">
          {/* Right: Contact Form */}
          <div className="flex flex-col gap-6 justify-center">
            <form className="space-y-5">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 text-right mb-1"
                >
                  نام شما
                </label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                  <User className="w-5 h-5" />
                </span>
                <input
                  id="name"
                  type="text"
                  className="w-full p-3 pl-10 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-base"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 text-right mb-1"
                >
                  ایمیل شما
                </label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                  <AtSign className="w-5 h-5" />
                </span>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 pl-10 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-base"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-700 text-right mb-1"
                >
                  پیام شما
                </label>
                <span className="absolute left-3 top-4 text-primary">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full p-3 pl-10 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-base"
                  placeholder="پیام خود را وارد کنید"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary/95 text-white py-3 rounded-xl hover:bg-primary transition-colors duration-300 font-bold text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                ارسال پیام
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
          {/* Left: Info & Map in a single card */}
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-r from-primary/90 to-blue-500/80 rounded-2xl p-5 text-white shadow-md mb-2">
              <h3 className="font-bold text-lg mb-3">راه‌های ارتباطی</h3>
              <div className="space-y-3 text-right">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-white/90" />
                  <span>ابهر، زنجان، خیابان اصلی، پلاک ۱۲۳</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-white/90" />
                  <span>۰۹۱۲۱۲۳۴۵۶۷</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-white/90" />
                  <span>info@omid-electronic.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-white/90" />
                  <span>ساعات کاری: ۹ تا ۱۸ (شنبه تا پنجشنبه)</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="#"
                    className="hover:scale-110 transition-transform text-white"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="hover:scale-110 transition-transform text-white"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="hover:scale-110 transition-transform text-white"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-3">
              <h4 className="font-bold text-primary text-center mb-3">
                موقعیت ما روی نقشه
              </h4>
              <CustomNeshanMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsComponent;
