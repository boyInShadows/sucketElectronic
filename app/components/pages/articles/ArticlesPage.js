"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, X, ChevronDown, ChevronUp } from "lucide-react";
import { apiUrl } from "../../../libs/api";

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  console.log("getImageUrl input:", imagePath);
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    console.log("getImageUrl: Full URL detected, returning as is");
    return imagePath;
  }
  
  // If it's a relative path starting with /, prepend the API base URL with /media
  if (imagePath.startsWith('/')) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://omidelectronicazizkhani.ir';
    const fullUrl = `${baseUrl}/media${imagePath}`;
    console.log("getImageUrl: Relative path with /, returning:", fullUrl);
    return fullUrl;
  }
  
  // If it's a relative path without /, prepend the API base URL with /media/
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://omidelectronicazizkhani.ir';
  const fullUrl = `${baseUrl}/media/${imagePath}`;
  console.log("getImageUrl: Relative path without /, returning:", fullUrl);
  return fullUrl;
};

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    part: "",
    title: "",
    image: null,
    description: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [descExpanded, setDescExpanded] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("/articles/"));
      if (!res.ok) throw new Error("خطا در دریافت مقالات");
      const data = await res.json();
      console.log("Articles data received:", data);
      console.log("First article image:", data[0]?.image);
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // Check if user is admin (like in /products page)
    setIsAdmin(localStorage.getItem("is_admin") === "true");
  }, []);

  useEffect(() => {
    setDescExpanded(false);
  }, [selectedArticle]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files && files[0]) {
      const file = files[0];
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      
      if (file.size > maxSize) {
        setFormError("سایز عکس نباید بیشتر از 5 مگابایت باشد");
        return;
      }
      
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
      setFormError(null); // Clear any previous errors
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("part", form.part);
      formData.append("title", form.title);
      if (form.image) formData.append("image", form.image);
      formData.append("description", form.description);
      const res = await fetch(apiUrl("/articles/"), {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error("خطا در افزودن مقاله");
      setShowForm(false);
      setForm({ part: "", title: "", image: null, description: "" });
      fetchArticles();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl(`/articles/${id}/`), {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("خطا در حذف مقاله");
      setDeleteId(null);
      fetchArticles();
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-2 sm:px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 md:mb-12 gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-right text-primary drop-shadow-sm tracking-tight"
          >
            مقالات
          </motion.h1>
          {isAdmin && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-7 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/20 font-bold text-lg"
              onClick={() => setShowForm((v) => !v)}
            >
              {showForm ? "بستن فرم" : "افزودن مقاله جدید"}
            </motion.button>
          )}
        </div>

        {isAdmin && showForm && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-neutral-200 rounded-2xl shadow-2xl p-0 mb-12 flex flex-col max-w-2xl mx-auto overflow-hidden"
            onSubmit={handleSubmit}
          >
            <div className="bg-primary/90 px-8 py-5 flex items-center gap-3">
              <span className="text-white text-2xl font-bold">
                افزودن مقاله جدید
              </span>
            </div>
            <div className="px-8 py-8 flex flex-col gap-6">
              <div>
                <label className="block mb-2 font-bold text-neutral-700">
                  بخش
                </label>
                <input
                  name="part"
                  value={form.part}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-4 py-3 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-neutral-700">
                  عنوان
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-4 py-3 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-neutral-700">
                  تصویر
                </label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-4 py-3 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-neutral-700">
                  محتوای مقاله
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-4 py-3 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-200"
                  rows={6}
                  required
                />
              </div>
              {formError && (
                <div className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">
                  {formError}
                </div>
              )}
              <div className="border-t border-neutral-200 pt-6 mt-2 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-primary text-white px-7 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                  disabled={formLoading}
                >
                  {formLoading ? "در حال ارسال..." : "ثبت مقاله"}
                </motion.button>
              </div>
            </div>
          </motion.form>
        )}

        <div className="flex justify-center w-full">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400 bg-red-400/10 p-6 rounded-xl inline-block">
                {error}
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white/70 rounded-2xl p-12 text-center text-neutral-400 border border-neutral-200 shadow">
              هیچ مقاله‌ای یافت نشد.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 8px 32px 0 rgba(80,80,180,0.10)",
                  }}
                  className="group bg-white rounded-2xl border border-neutral-200 hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-primary/10 flex flex-col relative cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* Accent bar */}
                  <div className="h-2 w-full bg-gradient-to-l from-primary/80 to-primary/40" />
                  {isAdmin && (
                    <button
                      className="absolute top-5 left-5 z-10 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 shadow-lg border-2 border-white transition-all duration-200"
                      title="حذف مقاله"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(article.id);
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                  {article.image && (
                    <div className="relative h-48 overflow-hidden rounded-b-xl">
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="font-bold text-primary mb-2 text-sm flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                      {article.part}
                    </div>
                    <h3 className="font-bold text-xl text-neutral-800 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="text-neutral-600 mb-4 flex-1 line-clamp-3">
                      {article.description}
                    </div>
                    <div className="text-xs text-neutral-400 mt-auto pt-4 border-t border-neutral-200">
                      {new Date(article.created_at).toLocaleDateString("fa-IR")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        {/* Article overlay modal */}
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-2 sm:px-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.98, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-0 overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 text-neutral-700 hover:text-red-500 bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors duration-200"
                onClick={() => setSelectedArticle(null)}
                title="بستن"
                style={{ backdropFilter: "blur(2px)" }}
              >
                <X size={24} />
              </button>
              {selectedArticle.image && (
                <div className="w-full h-40 sm:h-56 md:h-64 bg-neutral-100 relative overflow-hidden">
                  <img
                    src={getImageUrl(selectedArticle.image)}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-bold text-primary text-sm">
                    {selectedArticle.part}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-800 mb-2">
                  {selectedArticle.title}
                </h2>
                <div
                  className={`text-neutral-600 text-base sm:text-lg mb-2 whitespace-pre-line transition-all duration-300 ${
                    descExpanded ? "" : "line-clamp-2"
                  }`}
                  style={{ lineHeight: 1.8 }}
                >
                  {selectedArticle.description}
                </div>
                {!descExpanded && (
                  <button
                    className="flex items-center gap-2 text-primary font-bold mx-auto mt-2 hover:underline"
                    onClick={() => setDescExpanded(true)}
                  >
                    مشاهده کامل توضیحات <ChevronDown size={20} />
                  </button>
                )}
                {descExpanded &&
                  selectedArticle.description.split("\n").length > 2 && (
                    <button
                      className="flex items-center gap-2 text-primary font-bold mx-auto mt-2 hover:underline"
                      onClick={() => setDescExpanded(false)}
                    >
                      بستن توضیحات <ChevronUp size={20} />
                    </button>
                  )}
                <div className="text-xs text-neutral-400 mt-auto pt-2 border-t border-neutral-100">
                  {new Date(selectedArticle.created_at).toLocaleDateString(
                    "fa-IR"
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* Delete confirmation modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border border-neutral-200"
            >
              <div className="mb-4 text-xl font-bold text-red-600">
                حذف مقاله
              </div>
              <div className="mb-6 text-neutral-700">
                آیا مطمئن هستید که می‌خواهید این مقاله را حذف کنید؟
              </div>
              {deleteError && (
                <div className="text-red-500 mb-4">{deleteError}</div>
              )}
              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition font-bold"
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "در حال حذف..." : "بله، حذف کن"}
                </button>
                <button
                  className="px-6 py-2 rounded bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition font-bold"
                  onClick={() => setDeleteId(null)}
                  disabled={deleteLoading}
                >
                  انصراف
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
