"use client";

import { useCallback } from 'react';
import { useLoading } from '@/app/context/LoadingContext';

export const usePageSpecificLoading = (pageKey) => {
  const { setLoading, setError, clearError, loadingStates } = useLoading();

  const startLoading = useCallback(() => {
    setLoading(pageKey, true);
    clearError(pageKey);
  }, [pageKey, setLoading, clearError]);

  const stopLoading = useCallback(() => {
    setLoading(pageKey, false);
  }, [pageKey, setLoading]);

  const handleError = useCallback((errorMessage) => {
    setError(pageKey, errorMessage);
    setLoading(pageKey, false);
  }, [pageKey, setError, setLoading]);

  const isLoading = loadingStates[pageKey] || false;

  return {
    isLoading,
    startLoading,
    stopLoading,
    handleError
  };
}; 