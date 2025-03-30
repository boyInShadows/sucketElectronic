import Head from "next/head";
import Header from "./components/header";
import Main from "./components/main";

export default function Home() {
  return (
    <div className="bg-secondary">
      <Header />
      <Head>
        <title>فروشگاه سوکت امید الکترونیک عزیزخانی</title>
        <meta
          name="description"
          content="تولید کننده و فروشنده انواع سوکت الکترونیک و لوازم برقی خودرو"
        />
      </Head>

      {/* بخش‌های مختلف صفحه */}
      <main className="container mx-auto px-4">
        <Main />
        {/* بخش‌های دیگر */}
        <section id="products" className="py-12">
          {/* محتوای بخش محصولات پرفروش */}
        </section>

        <section id="blog" className="py-12">
          {/* محتوای بخش مقالات آموزشی */}
          <section id="blog" className="py-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              مقالات آموزشی
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* مقاله ۱ */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">نحوه نصب هدلایت خودرو</h3>
                <p className="text-dark-gray mt-2">
                  در این مقاله به شما آموزش می‌دهیم چگونه هدلایت خودروی خود را
                  به درستی نصب کنید.
                </p>
                <a
                  href="/blog/install-headlight"
                  className="text-blue-500 mt-4 inline-block"
                >
                  ادامه مطلب
                </a>
              </div>

              {/* مقاله ۲ */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">تعویض فیوز خودرو</h3>
                <p className="text-dark-gray mt-2">
                  آموزش گام‌به‌گام تعویض فیوز خودرو به صورت ایمن و سریع.
                </p>
                <a
                  href="/blog/replace-fuse"
                  className="text-blue-500 mt-4 inline-block"
                >
                  ادامه مطلب
                </a>
              </div>
            </div>
          </section>
        </section>

        <section id="testimonials" className="py-12">
          {/* محتوای بخش نظرات مشتریان */}
          <section id="testimonials" className="py-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              نظرات مشتریان
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* نظر ۱ */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-dark-gray">
                  "سوکت‌های خریداری شده بسیار با کیفیت بودند و به خوبی کار
                  می‌کنند. ممنون از فروشگاه عزیزخانی!"
                </p>
                <p className="text-gray-800 font-semibold mt-2">- علی محمدی</p>
              </div>

              {/* نظر ۲ */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-dark-gray">
                  "هدلایت‌ها واقعاً عالی هستند و نور بسیار خوبی دارند. توصیه
                  می‌کنم."
                </p>
                <p className="text-gray-800 font-semibold mt-2">- مریم رضایی</p>
              </div>
            </div>
          </section>
        </section>

        <section id="contact" className="py-12">
          {/* محتوای بخش تماس با ما */}
          <section id="contact" className="py-12">
            <h2 className="text-2xl font-bold text-center mb-8">تماس با ما</h2>
            <form className="max-w-lg mx-auto">
              <input
                type="text"
                placeholder="نام شما"
                className="w-full p-2 border rounded-lg mb-4"
              />
              <input
                type="email"
                placeholder="ایمیل شما"
                className="w-full p-2 border rounded-lg mb-4"
              />
              <textarea
                placeholder="پیام شما"
                className="w-full p-2 border rounded-lg mb-4"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg w-full"
              >
                ارسال پیام
              </button>
            </form>
          </section>
        </section>

        <section id="news" className="py-12">
          {/* محتوای بخش اخبار و رویدادها */}
          <section id="news" className="py-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              اخبار و رویدادها
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* خبر ۱ */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">
                  تخفیف ویژه به مناسبت نوروز
                </h3>
                <p className="text-dark-gray mt-2">
                  تا 30% تخفیف روی تمامی محصولات به مناسبت سال نو!
                </p>
                <a
                  href="/news/norouz-discount"
                  className="text-blue-500 mt-4 inline-block"
                >
                  ادامه مطلب
                </a>
              </div>

              {/* خبر ۲ */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">عرضه محصولات جدید</h3>
                <p className="text-dark-gray mt-2">
                  محصولات جدید سوکت الکترونیک با کیفیت بالا اضافه شدند.
                </p>
                <a
                  href="/news/new-products"
                  className="text-blue-500 mt-4 inline-block"
                >
                  ادامه مطلب
                </a>
              </div>
            </div>
          </section>
        </section>

        <section id="gallery" className="py-12">
          {/* محتوای بخش گالری تصاویر */}
          <section id="gallery" className="py-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              گالری تصاویر
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img
                src="/images/gallery1.jpg"
                alt="تصویر ۱"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src="/images/gallery2.jpg"
                alt="تصویر ۲"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src="/images/gallery3.jpg"
                alt="تصویر ۳"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </section>
        </section>

        <section id="faq" className="py-12">
          {/* محتوای بخش سوالات متداول */}
          <section id="faq" className="py-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              سوالات متداول
            </h2>
            <div className="max-w-2xl mx-auto">
              {/* سوال ۱ */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold">
                  چگونه محصولات را برگشت بزنیم؟
                </h3>
                <p className="text-dark-gray mt-2">
                  برای برگشت محصولات، لطفاً با پشتیبانی ما تماس بگیرید.
                </p>
              </div>

              {/* سوال ۲ */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold">
                  زمان تحویل محصولات چقدر است؟
                </h3>
                <p className="text-dark-gray mt-2">
                  زمان تحویل معمولاً بین 2 تا 5 روز کاری است.
                </p>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
