import { Geist } from "next/font/google";
import "./styles/globals.css";
import ClientLayout from "./client-layout";
import { LoadingProvider } from "./context/LoadingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "امید الکترونیک عزیزخانی",
  description: "تولید کننده و فروشنده انواع سوکت الکترونیک و لوازم برقی خودرو",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <LoadingProvider>
          <ClientLayout>{children}</ClientLayout>
        </LoadingProvider>
      </body>
    </html>
  );
}
