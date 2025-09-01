"use client";

import { useEffect, useState } from 'react';

const LoadingSpinner = ({ 
  size = "40", 
  speed = "1.3", 
  color = "black",
  className = ""
}) => {
  const [isClient, setIsClient] = useState(false);
  const [ldrsLoaded, setLdrsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only import and register ldrs on the client side
    const loadLdrs = async () => {
      try {
        const { trio } = await import('ldrs');
        trio.register();
        setLdrsLoaded(true);
      } catch (error) {
        console.warn('Failed to load ldrs package, using fallback spinner');
        setLdrsLoaded(false);
      }
    };
    
    loadLdrs();
  }, []);

  // Don't render the l-trio element during SSR
  if (!isClient) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-neutral-600 text-center">لطفا منتظر باشید...</p>
      </div>
    );
  }

  // Fallback spinner if ldrs fails to load
  if (!ldrsLoaded) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-neutral-600 text-center">لطفا منتظر باشید...</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <l-trio
        size={size}
        speed={speed}
        color={color}
      ></l-trio>
      <p className="mt-3 text-sm text-neutral-600 text-center">لطفا منتظر باشید...</p>
    </div>
  );
};

export default LoadingSpinner; 