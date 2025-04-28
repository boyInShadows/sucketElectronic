"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/header";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderPages = [
    "page/login",
    "page/register",
    "page/forgot-password",
  ];
  const shouldHideHeader = hideHeaderPages.includes(pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
