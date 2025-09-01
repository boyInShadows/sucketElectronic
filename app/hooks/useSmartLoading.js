"use client";

import { useState, useEffect, useCallback } from 'react';
import { useLoading } from '@/app/context/LoadingContext';

export const useSmartLoading = (key, fetchFunction, options = {}) => {
  const {
    isCritical = false,
    retryCount = 3,
    retryDelay = 2000,
    onSuccess,
    onError,
    dependencies = []
  } = options;

  const { setLoading, setError, clearError } = useLoading();
  const [data, setData] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const executeFetch = useCallback(async () => {
    try {
      setLoading(key, true);
      clearError(key);
      setLocalError(null);

      const result = await fetchFunction();
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }

      setLoading(key, false);
      return result;
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      
      const errorMessage = error.message || `خطا در بارگذاری ${key}`;
      setError(key, errorMessage);
      setLocalError(errorMessage);
      setLoading(key, false);

      if (onError) {
        onError(error);
      }

      // Retry logic for non-critical data
      if (!isCritical && retryAttempts < retryCount) {
        setTimeout(() => {
          setRetryAttempts(prev => prev + 1);
        }, retryDelay);
      }

      throw error;
    }
  }, [key, fetchFunction, isCritical, retryCount, retryDelay, onSuccess, onError, setLoading, setError, clearError, retryAttempts]);

  const retry = useCallback(() => {
    setRetryAttempts(0);
    executeFetch();
  }, [executeFetch]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch, ...dependencies]);

  // Auto-retry for non-critical data
  useEffect(() => {
    if (!isCritical && localError && retryAttempts > 0) {
      executeFetch();
    }
  }, [retryAttempts, isCritical, localError, executeFetch]);

  return {
    data,
    error: localError,
    retry,
    retryAttempts,
    isLoading: false // This will be managed by the context
  };
};

// Specialized hooks for different data types
export const useCriticalData = (key, fetchFunction, options = {}) => {
  return useSmartLoading(key, fetchFunction, { ...options, isCritical: true });
};

export const useBackgroundData = (key, fetchFunction, options = {}) => {
  return useSmartLoading(key, fetchFunction, { ...options, isCritical: false });
}; 