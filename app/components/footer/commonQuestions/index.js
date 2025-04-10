"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CommonQuestionsComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      id: 1,
      question: "چگونه محصولات را برگشت بزنیم؟",
      answer:
        "برای برگشت محصولات، لطفاً با پشتیبانی ما تماس بگیرید. تیم پشتیبانی ما در اسرع وقت پاسخگوی شما خواهد بود.",
    },
    {
      id: 2,
      question: "زمان تحویل محصولات چقدر است؟",
      answer:
        "زمان تحویل معمولاً بین 2 تا 5 روز کاری است. در صورت نیاز به تحویل فوری، لطفاً با ما تماس بگیرید.",
    },
    {
      id: 3,
      question: "آیا محصولات گارانتی دارند؟",
      answer:
        "بله، تمام محصولات ما دارای گارانتی 2 ساله هستند. برای اطلاعات بیشتر به بخش گارانتی مراجعه کنید.",
    },
    {
      id: 4,
      question: "روش‌های پرداخت کدامند؟",
      answer:
        "ما از تمامی کارت‌های بانکی، پرداخت آنلاین و پرداخت در محل پشتیبانی می‌کنیم.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-neutral-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-neutral-800">
            سوالات متداول
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {questions.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-6 flex items-center justify-between text-right"
                >
                  <h3 className="font-bold text-lg text-neutral-800 group-hover:text-primary transition-colors duration-300">
                    {item.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-neutral-600 leading-relaxed">
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
