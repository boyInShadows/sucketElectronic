"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/header";
import { useEffect, useState } from "react";
import { isAuthenticated, isAdmin } from "@/app/libs/auth";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const hideHeaderPages = ["/login", "/signup", "/forgotPassword"];
  const shouldHideHeader = hideHeaderPages.includes(pathname);

  // Handle users page access
  if (pathname === "/users") {
    if (!isAuthenticated() || !isAdmin()) {
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
