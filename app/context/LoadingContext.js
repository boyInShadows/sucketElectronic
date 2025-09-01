"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const pathname = usePathname();
  
  const [loadingStates, setLoadingStates] = useState({
    // Any loading key can be used by any page
    products: false,
    mainContent: false,
    userProfile: false,
    contactInfo: false,
    articles: false,
    productsPage: false,
    cart: false,
    pageReady: false,
    hasErrors: false,
    errorMessages: []
  });

  // Reset loading states when page changes
  useEffect(() => {
    setLoadingStates({
      products: false,
      mainContent: false,
      userProfile: false,
      contactInfo: false,
      articles: false,
      productsPage: false,
      cart: false,
      pageReady: false,
      hasErrors: false,
      errorMessages: []
    });
  }, [pathname]);

  const setLoading = useCallback((key, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }));
  }, []);

  const setError = useCallback((key, errorMessage) => {
    setLoadingStates(prev => ({
      ...prev,
      hasErrors: true,
      errorMessages: [...prev.errorMessages, { key, message: errorMessage }]
    }));
  }, []);

  const clearError = useCallback((key) => {
    setLoadingStates(prev => ({
      ...prev,
      errorMessages: prev.errorMessages.filter(err => err.key !== key)
    }));
  }, []);

  const markPageReady = useCallback(() => {
    setLoadingStates(prev => ({
      ...prev,
      pageReady: true
    }));
  }, []);

  const isCriticalLoading = useCallback(() => {
    // Only check actual loading states, not UI states
    const loadingKeys = ['products', 'mainContent', 'userProfile', 'contactInfo', 'articles', 'productsPage', 'cart'];
    return loadingKeys.some(key => loadingStates[key] === true);
  }, [loadingStates]);

  const isPageReady = useCallback(() => {
    return !isCriticalLoading() && loadingStates.pageReady;
  }, [isCriticalLoading, loadingStates.pageReady]);

  const getLoadingProgress = useCallback(() => {
    const loadingKeys = ['products', 'mainContent', 'userProfile', 'contactInfo', 'articles', 'productsPage', 'cart'];
    return loadingKeys.filter(key => loadingStates[key] === true).length;
  }, [loadingStates]);

  const value = {
    loadingStates,
    setLoading,
    setError,
    clearError,
    markPageReady,
    isCriticalLoading,
    isPageReady,
    getLoadingProgress
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}; 