"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const CategoryProductComponent = ({ categories }) => {
  // If categories are not passed as prop, fetch them (for backward compatibility)
  const [internalCategories, setCategories] = useState(categories || []);
  const [loading, setLoading] = useState(!categories);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categories) return;
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch("http://localhost:8000/api/categories/", {
          headers,
        });
        if (!response.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [categories]);

  const cats = categories || internalCategories;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div dir="rtl" className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {cats.map((category) => (
          <Link
            href={`/products/${encodeURIComponent(category.slug)}`}
            key={category.id}
          >
            <div className="group bg-white rounded-2xl border border-neutral-100 hover:shadow-2xl shadow-md transition-all duration-300 overflow-hidden flex flex-col items-stretch p-0 relative min-h-[180px] hover:scale-105 hover:border-primary/40 cursor-pointer">
              <div className="flex-1 flex flex-col justify-center items-center p-7">
                <h3 className="font-extrabold text-xl md:text-2xl text-neutral-800 group-hover:text-primary transition-colors duration-300 text-center mb-3">
                  {category.name}
                </h3>
                <div className=" bg-gradient-to-r from-primary to-blue-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10 border-2 border-white mb-3">
                  {category.productCount} محصول
                </div>
                <p className="text-primary text-center text-sm">
                  مشاهده محصولات
                </p>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductComponent;
