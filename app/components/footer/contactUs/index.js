import React from "react";
import { Send } from "lucide-react";

const ContactUsComponent = () => {
  return (
    <section id="contact" className="bg-neutral-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12 text-neutral-800">
              تماس با ما
            </h2>
            <form className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 text-right"
                >
                  نام شما
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-3 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white"
                  placeholder="نام خود را وارد کنید"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 text-right"
                >
                  ایمیل شما
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-700 text-right"
                >
                  پیام شما
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full p-3 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white"
                  placeholder="پیام خود را وارد کنید"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary/95 text-white py-3 rounded-xl hover:bg-primary transition-colors duration-300 font-medium text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                ارسال پیام
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsComponent;
