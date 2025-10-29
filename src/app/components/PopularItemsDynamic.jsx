"use client"; // This is essential

import dynamic from 'next/dynamic';
import Loading from "../loading"; // Adjust path if needed

// A loader specific to this component's size, or use a generic one
const SectionLoader = () => (
  <div className="min-h-[500px] flex items-center justify-center bg-orange-50">
    <Loading 
      size="md" 
      variant="elegant" 
      showText={false}
    />
  </div>
);

// Dynamically import the PopularItems component with SSR disabled
const PopularItems = dynamic(() => import('./PopularItems'), {
  ssr: false,
  loading: () => <SectionLoader />,
});

// This wrapper component renders the client-only component
export default function PopularItemsDynamic() {
  return <PopularItems />;
}