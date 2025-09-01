"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuthState, getAuthState } from '@/app/libs/auth';

const TOKEN_EXPIRY_HOURS = 36; // 36 hours as requested

export const useTokenExpiration = () => {
  const router = useRouter();
  const timeoutRef = useRef(null);

  const clearExpirationTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const setExpirationTimeout = (token) => {
    if (!token) return;

    // Clear any existing timeout
    clearExpirationTimeout();

    // Calculate expiration time (36 hours from now)
    const expirationTime = Date.now() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    
    // Store expiration time in localStorage
    localStorage.setItem('tokenExpiration', expirationTime.toString());

    // Set timeout for automatic logout
    const timeUntilExpiration = expirationTime - Date.now();
    
    timeoutRef.current = setTimeout(() => {
      console.log('Token expired automatically. Logging out user...');
      handleTokenExpiration();
    }, timeUntilExpiration);
  };

  const handleTokenExpiration = () => {
    // Clear auth state
    clearAuthState();
    
    // Clear expiration timeout
    clearExpirationTimeout();
    
    // Remove expiration time from localStorage
    localStorage.removeItem('tokenExpiration');
    
    // Redirect to login page
    router.push('/login');
  };

  const checkTokenExpiration = () => {
    const token = getAuthState().token;
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (!token || !expirationTime) {
      clearExpirationTimeout();
      return false;
    }

    const now = Date.now();
    const expiration = parseInt(expirationTime);

    if (now >= expiration) {
      // Token has expired
      handleTokenExpiration();
      return false;
    }

    // Token is still valid, set up expiration timeout
    setExpirationTimeout(token);
    return true;
  };

  const refreshTokenExpiration = () => {
    const token = getAuthState().token;
    if (token) {
      setExpirationTimeout(token);
    }
  };

  useEffect(() => {
    // Check token expiration on mount
    checkTokenExpiration();

    // Set up interval to check token expiration every minute
    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 60000); // Check every minute

    // Cleanup on unmount
    return () => {
      clearExpirationTimeout();
      clearInterval(intervalId);
    };
  }, []);

  return {
    checkTokenExpiration,
    refreshTokenExpiration,
    clearExpirationTimeout,
    isTokenExpired: () => {
      const expirationTime = localStorage.getItem('tokenExpiration');
      if (!expirationTime) return true;
      return Date.now() >= parseInt(expirationTime);
    }
  };
}; 