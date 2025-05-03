"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-neutral-800 mb-4">
        {category.name}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {category.products?.slice(0, 2).map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="w-24 h-24 bg-neutral-100 rounded-xl mb-2 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <span className="text-sm text-neutral-600 text-center">
              {product.name}
            </span>
            <span className="text-sm font-medium text-accent mt-1">
              {product.price} تومان
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const { data: session } = useSession();
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/categories/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("خطا در دریافت دسته‌بندی‌ها");
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/categories/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "خطا در ایجاد دسته‌بندی");
      }

      const data = await response.json();
      setCategories([...categories, data]);
      setShowAddCategory(false);
      setNewCategory({ name: "" });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 text-center mb-4 sm:mb-6">
            محصولات
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                className="w-full pr-12 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
          {/* Add New Category Button - Only visible to superusers */}
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddCategory(true)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 hover:border-accent group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Plus className="w-6 h-6 text-accent" />
              </div>
              <span className="text-neutral-600 font-medium">
                افزودن دسته‌بندی جدید
              </span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full text-right">
            <h3 className="text-lg font-semibold mb-4 text-neutral-800">
              افزودن دسته‌بندی جدید
            </h3>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  نام دسته‌بندی
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="نام دسته‌بندی را وارد کنید"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategory({ name: "" });
                    setError("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  ایجاد دسته‌بندی
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
