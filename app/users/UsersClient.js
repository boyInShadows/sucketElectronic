"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthState } from "@/app/libs/auth";
import UsersPageContent from "@/app/components/pages/users/UsersPageContent";

export default function UsersClient() {
  const router = useRouter();
  const [authState, setAuthState] = useState({ token: null, isAdmin: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAuthState(getAuthState());
  }, []);

  useEffect(() => {
    if (mounted && (!authState.token || !authState.isAdmin)) {
      router.replace("/");
    }
  }, [mounted, authState, router]);

  if (!mounted || !authState.token || !authState.isAdmin) {
    return null;
  }

  return <UsersPageContent token={authState.token} />;
}
