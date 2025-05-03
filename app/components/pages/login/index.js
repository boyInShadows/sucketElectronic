"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/app/libs/api";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData);
      console.log("Full login response:", JSON.stringify(response, null, 2));
      console.log("Response keys:", Object.keys(response));
      console.log("User object:", response.user);

      // Store the token and username in localStorage
      localStorage.setItem("token", response.access);
      localStorage.setItem("username", formData.username);

      // Get is_admin from the user object in the response
      const isAdmin = response.user?.is_admin || false;
      localStorage.setItem("is_admin", isAdmin);

      // Show welcome popup
      setShowWelcomePopup(true);

      // Redirect to home page after 1.5 seconds
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "خطا در ورود به سیستم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">
              ورود به حساب کاربری
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Welcome Popup */}
          {showWelcomePopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-lg font-medium text-neutral-800">
                  خوش آمدید {formData.username}
                </h2>
                <p className="text-sm text-neutral-600 mt-2">
                  در حال انتقال به صفحه اصلی...
                </p>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="نام کاربری"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-right text-neutral-800"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-right text-neutral-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>

            {/* Links */}
            <div className="flex justify-between text-sm">
              <Link
                href="/forgotPassword"
                className="text-primary hover:text-primary/80 transition-colors duration-300"
              >
                فراموشی رمز عبور
              </Link>
              <Link
                href="/signup"
                className="text-primary hover:text-primary/80 transition-colors duration-300"
              >
                ایجاد حساب کاربری
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
