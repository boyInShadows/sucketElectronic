"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "@/app/components/header";
import { useEffect, useState } from "react";
import { isAuthenticated, isAdmin } from "@/app/libs/auth";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Handle users page access - only run on client side
    if (pathname === "/users" && !isLoading) {
      if (!isAuthenticated() || !isAdmin()) {
        router.push("/");
        return;
      }
    }
  }, [pathname, isLoading, router]);

  const hideHeaderPages = ["/login", "/signup", "/forgotPassword"];
  const shouldHideHeader = hideHeaderPages.includes(pathname);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
