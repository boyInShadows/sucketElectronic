"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Trash2,
  MessageSquare,
  CheckCircle,
  Circle,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getAuthState } from "@/app/libs/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const UsersPage = dynamic(() => import("./UsersPage"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-neutral-600">در حال بارگذاری...</p>
      </div>
    </div>
  ),
});

export default function Users() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-neutral-600">در حال بارگذاری...</p>
          </div>
        </div>
      }
    >
      <UsersPage />
    </Suspense>
  );
}
