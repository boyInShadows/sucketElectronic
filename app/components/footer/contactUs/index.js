import React from "react";
import { Send } from "lucide-react";

const ContactUsComponent = () => {
  return (
    <section id="contact" className="bg-neutral-50">
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-neutral-800">
              تماس با ما
            </h2>
            <form className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base font-medium text-neutral-700 text-right"
                >
                  نام شما
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-sm sm:text-base"
                  placeholder="نام خود را وارد کنید"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-neutral-700 text-right"
                >
                  ایمیل شما
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-sm sm:text-base"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base font-medium text-neutral-700 text-right"
                >
                  پیام شما
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-neutral-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-right bg-white text-sm sm:text-base"
                  placeholder="پیام خود را وارد کنید"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary/95 text-white py-2.5 sm:py-3 rounded-xl hover:bg-primary transition-colors duration-300 font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                ارسال پیام
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsComponent;
