import Head from "next/head";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="bg-secondary min-h-screen flex flex-col" dir="rtl">
      <Head>
        <title>فروشگاه سوکت امید الکترونیک عزیزخانی</title>
        <meta
          name="description"
          content="تولید کننده و فروشنده انواع سوکت الکترونیک و لوازم برقی خودرو"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Main Content Section */}
      <main className="flex-1 w-full">
        <div className=" mx-auto px-4 xs:px-3 sm:px-4 md:6 lg:px-8 xl:px-10 2xl:px-12">
          <Main />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full">
        <div>
          <Footer />
        </div>
      </footer>
    </div>
  );
}
