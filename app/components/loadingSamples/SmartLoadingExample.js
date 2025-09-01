"use client";

import React from 'react';
import { useCriticalData, useBackgroundData } from '@/app/hooks/useSmartLoading';
import { fetchProducts, fetchProduct } from '@/app/libs/api';
import SectionLoading from './SectionLoading';
import LoadingSpinner from './LoadingSpinner';

// Example of how to use the smart loading system
const SmartLoadingExample = () => {
  // Critical data - shows main page loading
  const { 
    data: products, 
    error: productsError, 
    retry: retryProducts 
  } = useCriticalData('products', fetchProducts);

  // Non-critical data - loads in background
  const { 
    data: articles, 
    error: articlesError, 
    retry: retryArticles 
  } = useBackgroundData('articles', () => 
    fetch('/api/articles/').then(res => res.json())
  );

  const { 
    data: contactInfo, 
    error: contactError, 
    retry: retryContact 
  } = useBackgroundData('contactInfo', () => 
    fetch('/api/contact/').then(res => res.json())
  );

  return (
    <div className="space-y-8">
      {/* Critical Content - Products */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">محصولات</h2>
        
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
      </section>

      {/* Non-Critical Content - Articles */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">مقالات</h2>
        
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
      </section>

      {/* Non-Critical Content - Contact Info */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">اطلاعات تماس</h2>
        
        {contactError ? (
          <SectionLoading 
            error={contactError}
            onRetry={retryContact}
            text="خطا در بارگذاری اطلاعات تماس"
          />
        ) : !contactInfo ? (
          <SectionLoading 
            isLoading={true}
            text="در حال بارگذاری اطلاعات تماس..."
          />
        ) : (
          <div className="space-y-2">
            <p className="text-neutral-600">{contactInfo.address}</p>
            <p className="text-neutral-600">{contactInfo.phone}</p>
            <p className="text-neutral-600">{contactInfo.email}</p>
          </div>
        )}
      </section>

      {/* Inline Loading Example */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">نمونه بارگذاری درون‌خطی</h2>
        
        <div className="flex items-center justify-center space-x-4 space-x-reverse">
          <LoadingSpinner size="20" color="#6366f1" />
          <span className="text-sm text-neutral-600">در حال پردازش...</span>
        </div>
      </section>
    </div>
  );
};

export default SmartLoadingExample; 