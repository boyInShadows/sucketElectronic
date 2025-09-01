"use client";

import React from 'react';
import { useLoading } from '@/app/context/LoadingContext';
import { useCriticalData, useBackgroundData } from '@/app/hooks/useSmartLoading';
import { fetchProducts } from '@/app/libs/api';
import SectionLoading from '@/app/components/loadingSamples/SectionLoading';
import LoadingSpinner from '@/app/components/loadingSamples/LoadingSpinner';

const LoadingDemoPage = () => {
  const { loadingStates, setLoading, setError, clearError } = useLoading();

  // Simulate critical data loading
  const { 
    data: products, 
    error: productsError, 
    retry: retryProducts 
  } = useCriticalData('products', fetchProducts);

  // Simulate background data loading
  const { 
    data: articles, 
    error: articlesError, 
    retry: retryArticles 
  } = useBackgroundData('articles', () => 
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { title: 'مقاله اول', excerpt: 'خلاصه مقاله اول' },
          { title: 'مقاله دوم', excerpt: 'خلاصه مقاله دوم' }
        ]);
      }, 3000);
    })
  );

  const simulateLoading = (key, duration = 2000) => {
    setLoading(key, true);
    clearError(key);
    
    setTimeout(() => {
      setLoading(key, false);
    }, duration);
  };

  const simulateError = (key, message = 'خطای آزمایشی') => {
    setError(key, message);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8 text-center">
          تست سیستم بارگذاری هوشمند
        </h1>

        {/* Loading States Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">وضعیت بارگذاری</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                loadingStates.products ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>
              <span className="text-sm text-neutral-600">محصولات</span>
            </div>
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                loadingStates.mainContent ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>
              <span className="text-sm text-neutral-600">محتوی اصلی</span>
            </div>
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                loadingStates.articles ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>
              <span className="text-sm text-neutral-600">مقالات</span>
            </div>
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                loadingStates.pageReady ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm text-neutral-600">صفحه آماده</span>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">کنترل‌های تست</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">محصولات</h3>
              <div className="space-y-2">
                <button
                  onClick={() => simulateLoading('products', 3000)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  شبیه‌سازی بارگذاری (3 ثانیه)
                </button>
                <button
                  onClick={() => simulateError('products', 'خطا در بارگذاری محصولات')}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  شبیه‌سازی خطا
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">محتوی اصلی</h3>
              <div className="space-y-2">
                <button
                  onClick={() => simulateLoading('mainContent', 2000)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  شبیه‌سازی بارگذاری (2 ثانیه)
                </button>
                <button
                  onClick={() => simulateError('mainContent', 'خطا در بارگذاری محتوی')}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  شبیه‌سازی خطا
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Display */}
        <div className="space-y-6">
          {/* Products Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">محصولات</h2>
            {productsError ? (
              <SectionLoading 
                error={productsError}
                onRetry={retryProducts}
                text="خطا در بارگذاری محصولات"
              />
            ) : !products ? (
              <SectionLoading 
                isLoading={true}
                text="در حال بارگذاری محصولات..."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.slice(0, 4).map((product, index) => (
                  <div key={index} className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-medium text-neutral-800">{product.name}</h3>
                    <p className="text-sm text-neutral-600">{product.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Articles Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">مقالات</h2>
            {articlesError ? (
              <SectionLoading 
                error={articlesError}
                onRetry={retryArticles}
                text="خطا در بارگذاری مقالات"
              />
            ) : !articles ? (
              <SectionLoading 
                isLoading={true}
                text="در حال بارگذاری مقالات..."
              />
            ) : (
              <div className="space-y-3">
                {articles.map((article, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h3 className="font-medium text-neutral-800">{article.title}</h3>
                    <p className="text-sm text-neutral-600">{article.excerpt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inline Loading Example */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">نمونه بارگذاری درون‌خطی</h2>
            <div className="flex items-center justify-center space-x-4 space-x-reverse">
              <LoadingSpinner size="20" color="#6366f1" />
              <span className="text-sm text-neutral-600">در حال پردازش...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDemoPage; 