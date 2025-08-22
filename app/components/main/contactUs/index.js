"use client";

import { apiUrl } from "../../../libs/api";
import React, { useState } from "react";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  User,
  AtSign,
  MessageSquare,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import CustomNeshanMap from "../../neshanMap";

const ContactUsComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(apiUrl("/messages/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "خطا در ارسال پیام");
      }

      setSuccess("پیام شما با موفقیت ثبت شد و توسط مدیران بررسی خواهد شد.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "خطا در ارسال پیام. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section
      id="contact-us"
      className="bg-gradient-to-b from-neutral-50 to-white py-12"
    >
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
            تماس با ما
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg">
            سوال، پیشنهاد یا نیاز به مشاوره دارید؟ فرم زیر را پر کنید یا از
            راه‌های زیر با ما تماس بگیرید.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white rounded-3xl shadow-lg border border-neutral-100 p-6 md:p-10">
          {/* Right: Contact Form */}
          <div className="flex flex-col gap-6 justify-center">
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-base"
                  placeholder="نام خود را وارد کنید"
                  required
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-base"
                  placeholder="ایمیل خود را وارد کنید"
                  required
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
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 pl-10 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-base"
                  placeholder="پیام خود را وارد کنید"
                  required
                ></textarea>
              </div>
              {error && (
                <div className="text-red-500 text-sm text-right">{error}</div>
              )}
              {success && (
                <div className="text-green-500 text-sm text-right">
                  {success}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary/95 text-white py-3 rounded-xl hover:bg-primary transition-colors duration-300 font-bold text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    ارسال پیام
                    <Send className="w-5 h-5" />
                  </>
                )}
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
                  <span>0912-0986781</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-white/90" />
                  <span>0938-0919555</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-white/90" />
                  <span>zyzzyzkhany@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-white/90" />
                  <span>ساعات کاری: ۹ تا ۱۸ (شنبه تا پنجشنبه)</span>
                </div>
                <div className="flex items-center justify-center gap-8 pt-4">
                  <SocialIcon
                    network="instagram"
                    label="instagram"
                    url="https://www.instagram.com/omidelekteronik4/"
                  />

                  <SocialIcon
                    network="telegram"
                    url="https://web.telegram.org/k/#5973898318"
                  />

                  <SocialIcon network="whatsapp" />
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
