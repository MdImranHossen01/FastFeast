"use client"; // This directive marks the component as a Client Component.

import dynamic from 'next/dynamic';
import Loading from "../loading"; // Assuming your Loading component is at src/app/loading.js or .jsx

// This is the placeholder that will be shown while the main component is loading on the client.
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

// We use next/dynamic to import the RestaurantSection.
// `ssr: false` is the key: it tells Next.js to skip rendering this component on the server.
const RestaurantSection = dynamic(() => import('./RestaurantSection'), {
  ssr: false,
  loading: () => <SectionLoader />, // This is the component to render during the loading state.
});

// This new component's only job is to render the dynamically loaded RestaurantSection.
export default function RestaurantSectionDynamic() {
  return <RestaurantSection />;
}