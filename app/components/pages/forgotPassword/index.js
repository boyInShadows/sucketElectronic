"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // TODO: Implement forgot password API call

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("ایمیل بازیابی رمز عبور ارسال شد");
      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.message || "خطا در ارسال ایمیل بازیابی");
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
              بازیابی رمز عبور
            </h1>
            <p className="text-sm text-neutral-600">
              لطفاً ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما
              ارسال شود
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="ایمیل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-right"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ارسال..." : "ارسال لینک بازیابی"}
            </button>

            {/* Back to Login Link */}
            <div className="text-center">
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 transition-colors duration-300"
              >
                بازگشت به صفحه ورود
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
