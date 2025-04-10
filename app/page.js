import Head from "next/head";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

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
      </main>
      <footer className="container mx-auto px-4">
        <Footer />
      </footer>
    </div>
  );
}
