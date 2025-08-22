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
    const auth = getAuthState();
    console.log("UsersClient - Auth state retrieved:", { 
      token: !!auth.token, 
      isAdmin: auth.isAdmin,
      username: auth.username 
    });
    setAuthState(auth);
  }, []);

  useEffect(() => {
    if (mounted && (!authState.token || !authState.isAdmin)) {
      console.log("UsersClient - Redirecting to home:", { 
        mounted, 
        hasToken: !!authState.token, 
        isAdmin: authState.isAdmin 
      });
      router.replace("/");
    }
  }, [mounted, authState, router]);

  if (!mounted || !authState.token || !authState.isAdmin) {
    return null;
  }

  return <UsersPageContent token={authState.token} isAdmin={authState.isAdmin} />;
}
