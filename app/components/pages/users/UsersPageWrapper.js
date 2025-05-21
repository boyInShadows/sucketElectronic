"use client";
import { useEffect, useState } from "react";
import ClientUsersPage from "@/app/components/pages/users/ClientUsersPage";

export default function UsersPageWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return <ClientUsersPage />;
}
