"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CategoryCard = ({ category, onDelete }) => {
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const [isDeleting, setIsDeleting] = useState(false);

  if (!category?.slug) {
    return null;
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("آیا از حذف این دسته‌بندی اطمینان دارید؟")) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(category.id);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Link href={`/products/${encodeURIComponent(category.slug)}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer relative"
      >
        {isAdmin && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-2 left-2 p-2 text-red-500 hover:text-red-700 disabled:opacity-50"
            title="حذف دسته‌بندی"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
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
    </Link>
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

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/categories/${categoryId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "خطا در حذف دسته‌بندی");
      }

      // Remove the deleted category from the state
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err.message);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Creating category with data:", newCategory);

      const response = await fetch("http://localhost:8000/api/categories/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.detail || "خطا در ایجاد دسته‌بندی");
      }

      setCategories([...categories, data]);
      setShowAddCategory(false);
      setNewCategory({ name: "" });
      setError("");
    } catch (err) {
      console.error("Error creating category:", err);
      setError(err.message || "خطا در ایجاد دسته‌بندی");
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
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onDelete={handleDeleteCategory}
            />
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
                <label className="block font-medium text-neutral-700 mb-2">
                  نام دسته‌ بندی
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
