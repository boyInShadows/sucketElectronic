"use client";

import React, { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const SectionLoading = ({ isLoading, error, onRetry, size = "30", className = "", showError = true }) => {
  if (!isLoading && !error) return null;

  if (error && showError) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-medium">{error}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            تلاش مجدد
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`text-center py-8 ${className}`}>
      <LoadingSpinner size={size} speed="1.3" color="#6366f1" />
    </div>
  );
};

export default SectionLoading; 