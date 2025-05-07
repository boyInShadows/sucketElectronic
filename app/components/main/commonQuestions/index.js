"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CommonQuestionsComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      question: "چگونه می‌توانم محصولات را برگردانم؟",
      answer:
        "شما می‌توانید محصولات را تا ۷ روز پس از دریافت، بدون هیچ دلیل خاصی برگردانید. برای این کار، لطفاً با پشتیبانی ما تماس بگیرید.",
    },
    {
      question: "زمان تحویل محصولات چقدر است؟",
      answer:
        "زمان تحویل بستگی به محل سکونت شما دارد. در شهرهای بزرگ معمولاً ۲ تا ۳ روز کاری و در شهرهای دیگر ۳ تا ۵ روز کاری طول می‌کشد.",
    },
    {
      question: "آیا محصولات گارانتی دارند؟",
      answer:
        "بله، تمام محصولات ما دارای گارانتی ۱۲ ماهه هستند. در صورت بروز هرگونه مشکل، می‌توانید از خدمات گارانتی استفاده کنید.",
    },
    {
      question: "روش‌های پرداخت کدامند؟",
      answer:
        "ما از روش‌های پرداخت متنوعی پشتیبانی می‌کنیم، شامل پرداخت آنلاین، پرداخت در محل و انتقال بانکی.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 sm:space-y-4">
            {questions.map((item, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-right bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300"
                >
                  <span className="text-sm sm:text-base font-medium text-neutral-800">
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 sm:p-5 bg-white">
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonQuestionsComponent;
