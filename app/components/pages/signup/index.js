"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/app/libs/api";

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  const validatePassword = (password) => {
    setPasswordRequirements({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate phone number format
    if (!formData.phone.match(/^09[0-9]{9}$/)) {
      setError("شماره موبایل باید با 09 شروع شود و 11 رقم باشد");
      return;
    }

    // Validate password requirements
    if (!Object.values(passwordRequirements).every((req) => req)) {
      setError("رمز عبور باید تمام شرایط را برآورده کند");
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      console.log("Registration response:", response);

      if (response.access) {
        // Store the token in localStorage
        localStorage.setItem("token", response.access);
        // Show welcome popup
        setShowWelcomePopup(true);
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error("خطا در دریافت توکن");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "خطا در ثبت نام");
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
              ایجاد حساب کاربری
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-right">
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

          {/* Signup Form */}
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

            {/* Phone Field */}
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                placeholder="شماره موبایل"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-right text-neutral-800"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="ایمیل"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-right text-neutral-800"
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
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  validatePassword(e.target.value);
                }}
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

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="تکرار رمز عبور"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-right text-neutral-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="space-y-2 text-sm text-neutral-600 text-right">
              <p className="font-medium">شرایط رمز عبور:</p>
              <ul className="space-y-1 pr-4">
                <li
                  className={`flex items-center ${
                    passwordRequirements.hasUpperCase
                      ? "text-green-600"
                      : "text-neutral-400"
                  }`}
                >
                  • حداقل یک حرف بزرگ انگلیسی
                </li>
                <li
                  className={`flex items-center ${
                    passwordRequirements.hasLowerCase
                      ? "text-green-600"
                      : "text-neutral-400"
                  }`}
                >
                  • حداقل یک حرف کوچک انگلیسی
                </li>
                <li
                  className={`flex items-center ${
                    passwordRequirements.hasNumber
                      ? "text-green-600"
                      : "text-neutral-400"
                  }`}
                >
                  • حداقل یک عدد
                </li>
                <li
                  className={`flex items-center ${
                    passwordRequirements.hasSpecialChar
                      ? "text-green-600"
                      : "text-neutral-400"
                  }`}
                >
                  • حداقل یک کاراکتر خاص (!@#$%^&*)
                </li>
                <li
                  className={`flex items-center ${
                    passwordRequirements.hasMinLength
                      ? "text-green-600"
                      : "text-neutral-400"
                  }`}
                >
                  • حداقل ۸ کاراکتر
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال پردازش..." : "ثبت نام"}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 transition-colors duration-300"
              >
                قبلاً ثبت نام کرده‌اید؟ وارد شوید
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
