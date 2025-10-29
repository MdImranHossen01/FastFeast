"use client"; 

import dynamic from 'next/dynamic';
import Loading from "../loading"; 

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

const RestaurantSection = dynamic(() => import('./RestaurantSection'), {
  ssr: false,
  loading: () => <SectionLoader />, 
});

// This new component's only job is to render the dynamically loaded RestaurantSection.
export default function RestaurantSectionDynamic() {
  return <RestaurantSection />;
}