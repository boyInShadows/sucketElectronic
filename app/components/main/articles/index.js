import React from "react";
import { ArrowLeft } from "lucide-react";

const ArticleComponent = () => {
  return (
    <section id="blog" className="bg-neutral-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-neutral-800">
            مقالات آموزشی
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Article 1 */}
            <div className="group bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
              <div className="p-6">
                <h3 className="font-bold text-lg text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right mb-3">
                  نحوه نصب هدلایت خودرو
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed text-right mb-5">
                  در این مقاله به شما آموزش می‌دهیم چگونه هدلایت خودروی خود را
                  به درستی نصب کنید.
                </p>
                <a
                  href="/blog/install-headlight"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors duration-300"
                >
                  ادامه مطلب
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Article 2 */}
            <div className="group bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
              <div className="p-6">
                <h3 className="font-bold text-lg text-neutral-800 group-hover:text-primary transition-colors duration-300 text-right mb-3">
                  تعویض فیوز خودرو
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed text-right mb-5">
                  آموزش گام‌به‌گام تعویض فیوز خودرو به صورت ایمن و سریع.
                </p>
                <a
                  href="/blog/replace-fuse"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors duration-300"
                >
                  ادامه مطلب
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleComponent;
