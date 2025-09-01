"use client";

import { useEffect } from 'react';
import { useLoading } from '@/app/context/LoadingContext';

export const usePageReady = () => {
  const { loadingStates, markPageReady, isCriticalLoading } = useLoading();

  useEffect(() => {
    // Mark page ready when no loading is happening
    if (!isCriticalLoading()) {
      const timer = setTimeout(() => {
        markPageReady();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loadingStates, isCriticalLoading, markPageReady]);

  return {
    isPageReady: !isCriticalLoading() && loadingStates.pageReady,
    isCriticalLoading: isCriticalLoading()
  };
}; 