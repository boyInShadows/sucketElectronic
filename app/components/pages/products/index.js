"use client";

import { apiUrl } from "../../../libs/api";
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  PlusCircle,
  Layers,
  XCircle,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";
import { isAuthenticated, isAdmin } from "../../../libs/auth";
import Link from "next/link";
import CardProductComponent from "@/app/components/main/products/cartProductComponent";

const CategoryCard = ({ category, onDelete }) => {
  const isUserAdmin = isAdmin();
  const [isDeleting, setIsDeleting] = useState(false);
  const productCount = category.productsCount || category.products?.length || 0;
  const previewProducts = category.products?.slice(0, 3) || [];
  const moreCount = productCount - previewProducts.length;

  if (!category?.slug) {
    return null;
  }

  // the problem is from how we get our categories, maybe we calling the wrong api, how can we findout which categories could related to our categoryCard component on products page ?


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
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-gradient-to-br from-white via-neutral-50 to-blue-50 rounded-2xl p-6 shadow-md hover:shadow-xl border border-neutral-100 hover:border-primary/40 transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col min-h-[230px]"
      >
        {/* Product count badge */}
        <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow z-10">
          {productCount} محصول
        </span>
        {/* Delete button for admin */}
        {isUserAdmin && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-3 left-3 p-2 text-red-500 hover:text-red-700 bg-white/80 rounded-full shadow disabled:opacity-50 z-10"
            title="حذف دسته‌بندی"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
        {/* Category name */}
        <div className="flex items-center gap-2 mb-4 mt-2">
          <Layers className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-neutral-800 truncate">
            {category.name}
          </h3>
        </div>
        {/* Product previews */}
        <div className="flex items-center gap-2 mb-4 min-h-[48px]">
          {previewProducts.map((product) => (
            <div
              key={product.id}
              className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden border border-neutral-200"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <span className="text-xs text-neutral-400">بدون تصویر</span>
              )}
            </div>
          ))}
        </div>
        {/* View all button */}
        <button className="mt-auto w-full py-2 rounded-xl bg-primary/90 text-white font-semibold shadow hover:bg-primary transition-all duration-200 text-sm">
          مشاهده همه محصولات
        </button>
      </motion.div>
    </Link>
  );
};

const ProductsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setIsUserAdmin(isAdmin());
  }, []);
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = {
        "Content-Type": "application/json",
      };
      
// Check if token exists and is valid
if (!token) {
          console.warn("No authentication token found");
  // You might still want to fetch categories if they're public
} else {
  headers["Authorization"] = `Bearer ${token}`;
}
      
      const apiEndpoint = apiUrl("/categories/"); // Added /api/ prefix
  
      
      const response = await fetch(apiEndpoint, { headers });
      
      
      
      // Get response text first to see what we're working with
      const rawResponse = await response.text();
      
      
      let data = {};
      try {
        data = JSON.parse(rawResponse);

        
        // Check for common API response structures
        if (data.results) {

        }
        if (data.data) {

        }
        if (data.items) {

        }
        
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid JSON response from server");
      }
  
      if (!response.ok) {
        throw new Error(data.detail || data.message || `Server error: ${response.status}`);
      }
  
      // Handle different API response structures
      let categoriesData = data;
      
      if (Array.isArray(data)) {
        // Direct array response
        categoriesData = data;
      } else if (data.results && Array.isArray(data.results)) {
        // Paginated response (Django REST framework style)
        categoriesData = data.results;
      } else if (data.data && Array.isArray(data.data)) {
        // Custom API response structure
        categoriesData = data.data;
      } else if (data.items && Array.isArray(data.items)) {
        // Another common structure
        categoriesData = data.items;
      }
      
      
      setCategories(categoriesData);
      
    } catch (err) {
              console.error("Error fetching categories:", err);
      setError(err.message || "ارتباط با سرور برقرار نشد. لطفا دوباره تلاش کنید.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const apiEndpoint = apiUrl(`/categories/${categoryId}/`);
      
      
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      
      
      let errorData = {};
      try {
        errorData = await response.json();
        
      } catch (parseError) {
        
      }

      if (!response.ok) {
        throw new Error(errorData.detail || "خطا در حذف دسته‌بندی");
      }

      
      
      // Refresh the categories list from the server to ensure consistency
      await fetchCategories();
    } catch (err) {
      setError(
        err.message || "ارتباط با سرور برقرار نشد. لطفا دوباره تلاش کنید."
      );
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError("");

    // Validate category name
    if (!newCategory.name.trim()) {
      setError("نام دسته‌بندی نمی‌تواند خالی باشد");
      return;
    }

    if (newCategory.name.length < 2) {
      setError("نام دسته‌بندی باید حداقل 2 حرف باشد");
      return;
    }

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      
      
      const apiEndpoint = apiUrl("/categories/");
      
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      let data = {};
      try {
        data = await response.json();

      } catch (parseError) {
        console.error("Failed to parse category creation response:", parseError);
        const textResponse = await response.text();
        
      }

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(
            data.detail || "خطا در ایجاد دسته‌بندی. لطفا نام دیگری انتخاب کنید."
          );
        } else if (response.status === 401) {
          throw new Error("شما دسترسی لازم برای ایجاد دسته‌بندی را ندارید.");
        } else if (response.status === 403) {
          throw new Error("شما دسترسی لازم برای ایجاد دسته‌بندی را ندارید.");
        } else {
          throw new Error(data.detail || "خطا در ایجاد دسته‌بندی");
        }
      }

      // After successfully creating a category, redirect to the new category page
      // This provides better UX by taking the user directly to where they can add products
      if (data && data.slug) {

        window.location.href = `/products/${encodeURIComponent(data.slug)}`;
      } else {
        // Fallback: refresh the categories list if no slug available
        
        await fetchCategories();
        setShowAddCategory(false);
        setNewCategory({ name: "" });
        setError("");
      }
    } catch (err) {
      setError(
        err.message || "ارتباط با سرور برقرار نشد. لطفا دوباره تلاش کنید."
      );
    }
  };

  // Live search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === "") {
        setSearchResults([]);
        setSearchLoading(false);
        setSearchError("");
        return;
      }
      setSearchLoading(true);
      setSearchError("");
      fetch(apiUrl(
        `/products/?search=${encodeURIComponent(
          search
        )}`
      ))
        .then(async (res) => {
          let data = {};
          try {
            data = await res.json();
          } catch {}
          if (!res.ok) throw new Error(data.detail || "خطا در جستجوی محصولات");
          return data;
        })
        .then((data) => {
          setSearchResults(data);
        })
        .catch((err) => {
          setSearchError(
            err.message || "ارتباط با سرور برقرار نشد. لطفا دوباره تلاش کنید."
          );
        })
        .finally(() => {
          setSearchLoading(false);
        });
    }, 400); // 400ms debounce
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Filter categories by search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-neutral-50 to-white"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-white to-blue-50 border-b border-neutral-100">
        <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-800 text-center drop-shadow-sm">
              محصولات
            </h1>
          </div>
          <div className="max-w-2xl w-full mx-auto mt-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowClear(e.target.value.length > 0);
                }}
                placeholder="جستجوی محصولات..."
                className="w-full pr-12 pl-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm bg-white"
              />
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-focus-within:scale-110" />
              {showClear && (
                <button
                  className="absolute left-10 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-400"
                  onClick={() => {
                    setSearch("");
                    setShowClear(false);
                  }}
                  tabIndex={-1}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 md:py-12">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg shadow">
            {error}
          </div>
        )}
        {/* Show search results if searching, else show categories */}
        {search.trim() !== "" ? (
          <>
            {searchLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : searchError ? (
              <div className="text-center py-12 text-red-500">
                {searchError}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                محصولی یافت نشد.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((product) => (
                  <CardProductComponent key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        ) : filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <img
              src="/images/empty-state.svg"
              alt="empty"
              className="w-40 h-40 mb-6 opacity-80"
            />
            <p className="text-lg text-neutral-500 mb-2">
              هیچ دسته‌بندی‌ای یافت نشد
            </p>
            <p className="text-sm text-neutral-400 mb-6">
              دسته‌بندی جدیدی اضافه کنید یا جستجوی خود را تغییر دهید.
            </p>
            {/* Add Category Button for admins when no categories exist */}
            {isUserAdmin && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddCategory(true)}
                className="bg-gradient-to-br from-primary/90 to-blue-500 text-white rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex items-center gap-3 border-2 border-primary/30 hover:border-accent group"
                title="افزودن دسته‌بندی جدید"
              >
                <PlusCircle className="w-6 h-6 text-white drop-shadow" />
                <span className="font-bold">افزودن دسته‌بندی جدید</span>
              </motion.button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onDelete={handleDeleteCategory}
              />
            ))}
            {/* Add New Category Button - Only visible to superusers */}
            {isUserAdmin && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddCategory(true)}
                className="bg-gradient-to-br from-primary/90 to-blue-500 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-primary/30 hover:border-accent group relative min-h-[230px]"
                title="افزودن دسته‌بندی جدید"
              >
                <PlusCircle className="w-10 h-10 mb-4 text-white drop-shadow" />
                <span className="text-lg font-bold">افزودن دسته‌بندی جدید</span>
              </motion.button>
            )}
          </div>
        )}
      </div>
      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full text-right shadow-xl border border-neutral-100">
            <h3 className="text-2xl font-bold mb-4 text-neutral-800 flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-primary" />
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
              <div className="flex justify-end gap-4">
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
