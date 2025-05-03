"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Shield, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get authentication data from localStorage
        const token = localStorage.getItem("token");
        const isAdmin = localStorage.getItem("is_admin") === "true";

        // Debug information
        console.log("=== Frontend Debug ===");
        console.log("Token:", token);
        console.log("isAdmin:", isAdmin);
        console.log("=====================");

        // Check if user is logged in
        if (!token) {
          setError("لطفا ابتدا وارد شوید");
          setLoading(false);
          return;
        }

        // Check if user is admin
        if (!isAdmin) {
          setError(
            "شما دسترسی لازم برای مشاهده این صفحه را ندارید. لطفا با یک حساب مدیر کل وارد شوید."
          );
          setLoading(false);
          return;
        }

        // Make API request
        const response = await fetch("http://localhost:8000/api/users/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        // Debug response
        console.log("=== API Response Debug ===");
        console.log("Status:", response.status);
        console.log("Headers:", Object.fromEntries(response.headers.entries()));
        console.log("=====================");

        // Handle response
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("لطفا ابتدا وارد شوید");
          } else if (response.status === 403) {
            const errorData = await response.json();
            throw new Error(
              errorData.detail ||
                "شما دسترسی لازم برای مشاهده این صفحه را ندارید. لطفا با یک حساب مدیر کل وارد شوید."
            );
          } else {
            throw new Error(
              `خطا در دریافت اطلاعات کاربران: ${response.status}`
            );
          }
        }

        // Parse and set data
        const data = await response.json();
        console.log("Users data:", data);
        setUsers(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowFirstConfirm(true);
  };

  const handleFirstConfirm = () => {
    setShowFirstConfirm(false);
    setShowSecondConfirm(true);
    setTimeLeft(10);
    setIsDeleteEnabled(false);
  };

  const handleSecondConfirm = async () => {
    if (!isDeleteEnabled) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/users/${selectedUser.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("خطا در حذف کاربر");
      }

      // Update the users list
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setShowSecondConfirm(false);
      setSelectedUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Timer effect for the second confirmation
  useEffect(() => {
    let timer;
    if (showSecondConfirm && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsDeleteEnabled(true);
    }
    return () => clearInterval(timer);
  }, [showSecondConfirm, timeLeft]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutral-800 mb-8 text-right">
          مدیریت کاربران
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-medium text-neutral-800">
                    {user.username}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {user.is_superuser
                      ? "مدیر کل"
                      : user.is_staff
                      ? "مدیر"
                      : "کاربر"}
                  </span>
                  {user.is_admin && (
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center space-x-3">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-600">{user.email}</span>
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-600">
                    {user.phone || "ثبت نشده"}
                  </span>
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-600">
                    {new Date(user.date_joined).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <Shield className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-600">
                    {user.is_active ? "فعال" : "غیرفعال"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* First Confirmation Modal */}
      {showFirstConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full text-right">
            <h3 className="text-lg font-semibold mb-4 text-neutral-800">
              تایید حذف کاربر
            </h3>
            <p className="mb-4 text-neutral-800">
              را حذف کنید؟ {selectedUser?.username} آیا مطمئن هستید که می‌خواهید
              کاربر
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowFirstConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                انصراف
              </button>
              <button
                onClick={handleFirstConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                بله، حذف شود
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Confirmation Modal */}
      {showSecondConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-right">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-neutral-800">
              تایید نهایی
            </h3>
            <p className="mb-4 text-red-500">
              هشدار: این عمل قابل بازگشت نیست. آیا مطمئن هستید؟
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSecondConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                انصراف
              </button>
              <button
                onClick={handleSecondConfirm}
                disabled={!isDeleteEnabled}
                className={`px-4 py-2 rounded ${
                  isDeleteEnabled
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isDeleteEnabled
                  ? "بله، حذف شود"
                  : `لطفا ${timeLeft} ثانیه صبر کنید`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
