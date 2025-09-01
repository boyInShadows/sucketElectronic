"use client";

import { trio } from 'ldrs';
import { useEffect } from 'react';

// Register the trio loader
trio.register();

const LoadingSpinner = ({ 
  size = "40", 
  speed = "1.3", 
  color = "black",
  className = ""
}) => {
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