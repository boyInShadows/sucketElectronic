"use client";

import { apiUrl } from "../../../libs/api";
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
        const response = await fetch(apiUrl("/categories/", {
          headers,
        }));
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
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 py-4 px-2 sm:px-6 md:px-12 max-w-screen-xl mx-auto ">
        {cats.map((category) => (
          <Link
            href={`/products/${encodeURIComponent(category.slug)}`}
            key={category.id}
          >
            <div className="group bg-white rounded-2xl border border-neutral-100 hover:shadow-2xl shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between items-center p-7 w-[70vw] sm:w-full sm:max-w-md h-56 hover:scale-105 hover:border-primary/40 cursor-pointer">
              <h3 className="font-extrabold text-xl md:text-2xl text-neutral-800 group-hover:text-primary transition-colors duration-300 text-center mb-3 truncate whitespace-nowrap overflow-hidden w-full">
                {category.name}
              </h3>
              <div className=" bg-gradient-to-r from-primary to-blue-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10 border-2 border-white mb-3">
                {category.productsCount} محصول
              </div>
              <p className="text-primary text-center text-sm mb-2">
                مشاهده محصولات
              </p>
              <ChevronDown className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductComponent;
