import React from "react";
import { Star } from "lucide-react";

const CommentsComponent = () => {
  const testimonials = [
    {
      id: 1,
      text: "سوکت‌های خریداری شده بسیار با کیفیت بودند و به خوبی کار می‌کنند. ممنون از فروشگاه عزیزخانی!",
      author: "علی محمدی",
      rating: 5,
    },
    {
      id: 2,
      text: "هدلایت‌ها واقعاً عالی هستند و نور بسیار خوبی دارند. توصیه می‌کنم.",
      author: "مریم رضایی",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="bg-neutral-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-neutral-800">
            نظرات مشتریان
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed text-right mb-4">
                    {testimonial.text}
                  </p>
                  <p className="text-sm font-medium text-neutral-800 text-right">
                    - {testimonial.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentsComponent;
