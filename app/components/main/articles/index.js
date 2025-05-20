"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8000/api/articles/";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("خطا در دریافت مقالات");
        const data = await res.json();
        setArticles(data.slice(0, 4)); // Show only the latest 4
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  if (articles.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-400">
        هیچ مقاله‌ای یافت نشد.
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="group rounded-xl border border-neutral-100 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative min-h-[200px] flex flex-col justify-end hover:shadow-2xl hover:-translate-y-2"
            onClick={() => router.push("/articles")}
            title="مشاهده همه مقالات"
          >
            {/* Background image as a separate layer for zoom effect */}
            <div
              className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: article.image
                  ? `url(${article.image})`
                  : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/60" />
            {/* Content */}
            <div className="relative z-20 p-4 sm:p-5 md:p-6">
              <h3 className="font-bold text-lg md:text-xl text-white group-hover:transition-colors duration-300 text-right mb-2 sm:mb-3 drop-shadow-lg">
                {article.title}
              </h3>
              <p className="text-sm md:text-base text-neutral-200 leading-relaxed text-right mb-2 sm:mb-3 line-clamp-2 drop-shadow">
                {article.topic ||
                  (article.description
                    ? article.description.slice(0, 60) + "..."
                    : "")}
              </p>
              <div className="text-primary-100 text-xs font-medium text-left">
                مشاهده همه مقالات
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
