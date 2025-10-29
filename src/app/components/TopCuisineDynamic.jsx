"use client"; // This is the most important line

import dynamic from 'next/dynamic';
import Loading from "../loading";

// Define the loader component here or import it
const SectionLoader = () => (
  <div className="min-h-[300px] flex items-center justify-center bg-gray-50/50 rounded-lg">
    <Loading 
      size="md" 
      variant="elegant" 
      showText={false}
      className="bg-transparent"
    />
  </div>
);

// Dynamically import the actual TopCuisine component with SSR turned off
const TopCuisine = dynamic(() => import('./TopCuisine'), {
  ssr: false,
  loading: () => <SectionLoader />,
});

// This component simply returns the dynamically loaded component
export default function TopCuisineDynamic() {
  return <TopCuisine />;
}