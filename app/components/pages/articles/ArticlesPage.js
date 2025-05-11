"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:8000/api/articles/";

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

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("خطا در دریافت مقالات");
      const data = await res.json();
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
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
      const res = await fetch(API_URL, {
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

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 sm:px-8 py-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-right text-white"
          >
            مقالات
          </motion.h1>
          {isAdmin && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/20"
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
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12 flex flex-col gap-6 max-w-2xl mx-auto border border-white/10"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block mb-2 font-bold text-white">بخش</label>
              <input
                name="part"
                value={form.part}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-white">عنوان</label>
              <input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-white">تصویر</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-white">
                محتوای مقاله
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                rows={6}
                required
              />
            </div>
            {formError && (
              <div className="text-red-400 bg-red-400/10 p-4 rounded-lg">
                {formError}
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formLoading}
            >
              {formLoading ? "در حال ارسال..." : "ثبت مقاله"}
            </motion.button>
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
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 text-center text-neutral-400 border border-white/10">
              هیچ مقاله‌ای یافت نشد.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-primary/10 flex flex-col"
                >
                  {article.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="font-bold text-primary mb-2 text-sm">
                      {article.part}
                    </div>
                    <h3 className="font-bold text-xl text-white mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="text-neutral-300 mb-4 flex-1 line-clamp-3">
                      {article.description}
                    </div>
                    <div className="text-sm text-neutral-400 mt-auto pt-4 border-t border-white/10">
                      {new Date(article.created_at).toLocaleDateString("fa-IR")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
