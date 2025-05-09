"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/header";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const hideHeaderPages = ["/login", "/signup", "/forgotPassword"];
  const shouldHideHeader = hideHeaderPages.includes(pathname);

  // Handle users page access
  if (pathname === "/users") {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("is_admin") === "true";

    if (!token || !isAdmin) {
      window.location.href = "/";
      return null;
    }
  }

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
