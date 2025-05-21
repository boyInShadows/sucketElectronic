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

const ClientUsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [localRead, setLocalRead] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const { token: authToken, isAdmin: adminStatus } = getAuthState();
      setToken(authToken);
      setIsAdmin(adminStatus);
    }
  }, [mounted]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token) {
          setError("لطفا ابتدا وارد شوید");
          setLoading(false);
          return;
        }
        if (!isAdmin) {
          setError(
            "شما دسترسی لازم برای مشاهده این صفحه را ندارید. لطفا با یک حساب مدیر کل وارد شوید."
          );
          setLoading(false);
          return;
        }
        const response = await fetch("http://localhost:8000/api/users/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
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
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
      setLoading(false);
    };
    if (mounted && token !== null && isAdmin !== null) {
      fetchUsers();
    }
  }, [router, token, isAdmin, mounted]);

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
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setShowSecondConfirm(false);
      setSelectedUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    let timer;
    if (mounted && showSecondConfirm && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsDeleteEnabled(true);
    }
    return () => clearInterval(timer);
  }, [showSecondConfirm, timeLeft, mounted]);

  const handleShowMessages = async () => {
    setShowMessagesModal(true);
    setMessagesLoading(true);
    setMessagesError("");
    try {
      const response = await fetch("http://localhost:8000/api/messages/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("خطا در دریافت پیام‌ها");
      }
      const data = await response.json();
      setMessages(data);
      const readState = {};
      data.forEach((msg) => {
        readState[msg.id] = false;
      });
      setLocalRead(readState);
    } catch (err) {
      setMessagesError(err.message || "خطا در دریافت پیام‌ها");
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!mounted) return;
    try {
      const shouldDelete = window?.confirm(
        "آیا از حذف این پیام اطمینان دارید؟"
      );
      if (!shouldDelete) return;

      const response = await fetch(
        `http://localhost:8000/api/messages/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("خطا در حذف پیام");
      setMessages(messages.filter((msg) => msg.id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      setMessagesError(err.message || "خطا در حذف پیام");
    }
  };

  const handleToggleRead = (id) => {
    setLocalRead((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-800 text-right">
            مدیریت کاربران
          </h1>
          <button
            onClick={handleShowMessages}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition-colors duration-300"
          >
            <MessageSquare className="w-5 h-5" />
            نمایش پیام‌ها
          </button>
        </div>

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
                  <div className="bg-primary/10 p-2 rounded-lg ml-2">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-lg font-bold text-neutral-800">
                    {user.username}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {user.is_superuser
                      ? "مدیر کل"
                      : user.is_staff
                      ? "مدیر"
                      : "کاربر"}
                  </span>
                  {!user.is_admin && (
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
                    {new Date(user.date_joined).toLocaleTimeString("fa-IR")}
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

      {/* Messages Modal */}
      {showMessagesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white/80 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl max-w-3xl w-full p-0 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/30 bg-white/60">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-7 h-7 text-primary" />
                <h2 className="text-2xl font-extrabold text-primary">
                  پیام‌های کاربران
                </h2>
              </div>
              <button
                onClick={() => setShowMessagesModal(false)}
                className="text-neutral-400 hover:text-red-500 text-2xl font-bold"
                title="بستن"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            {/* Search Bar */}
            <div className="px-6 py-3 bg-white/60 border-b border-white/30 flex items-center gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو بر اساس نام، ایمیل یا پیام..."
                className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white/80 text-right"
              />
            </div>
            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto bg-white/60">
              {messagesLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : messagesError ? (
                <div className="text-red-500 text-center py-16">
                  {messagesError}
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <img
                    src="/images/empty-state.svg"
                    alt="empty"
                    className="w-32 h-32 mb-4 opacity-80"
                  />
                  <div className="text-neutral-400 text-center">
                    هیچ پیامی ثبت نشده است.
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`relative rounded-2xl shadow-lg p-5 bg-white/90 border border-white/60 flex flex-col gap-2 transition-all duration-200 ${
                        localRead[msg.id] ? "opacity-60" : ""
                      }`}
                    >
                      {/* Unread dot */}
                      {!localRead[msg.id] && (
                        <span className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full shadow-lg animate-pulse"></span>
                      )}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary text-lg">
                          {msg.name}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {msg.email}
                        </span>
                        <span className="text-xs text-neutral-400 ml-auto">
                          {new Date(msg.created_at).toLocaleString("fa-IR")}
                        </span>
                      </div>
                      <div className="text-neutral-700 text-base whitespace-pre-line text-right mb-2">
                        {msg.message}
                      </div>
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => handleToggleRead(msg.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                            localRead[msg.id]
                              ? "bg-green-100 text-green-700"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                          }`}
                        >
                          {localRead[msg.id] ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                          {localRead[msg.id]
                            ? "خوانده شد"
                            : "علامت خوانده نشده"}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(msg.id)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" /> حذف
                        </button>
                      </div>
                      {/* Delete confirmation dialog */}
                      {deleteConfirmId === msg.id && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 rounded-2xl">
                          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
                            <div className="text-lg font-bold text-red-600">
                              حذف پیام
                            </div>
                            <div className="text-neutral-700">
                              آیا از حذف این پیام اطمینان دارید؟
                            </div>
                            <div className="flex gap-4 mt-2">
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-4 py-2 rounded-lg bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                              >
                                انصراف
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientUsersPage;
