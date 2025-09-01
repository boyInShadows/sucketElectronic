"use client";

import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useLoading } from '@/app/context/LoadingContext';

const MainPageLoading = () => {
  const { isCriticalLoading } = useLoading();

  // Show loading when any critical data is loading on any page
  if (!isCriticalLoading()) return null;

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingSpinner 
        size="60" 
        speed="1.3" 
        color="#6366f1" 
      />
    </div>
  );
};

export default MainPageLoading; 