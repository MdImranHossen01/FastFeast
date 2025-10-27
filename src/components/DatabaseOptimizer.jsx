"use client";

import { useEffect } from 'react';
import { createDatabaseIndexes } from '@/lib/createIndexes';

const DatabaseOptimizer = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      createDatabaseIndexes().catch(console.error);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default DatabaseOptimizer;