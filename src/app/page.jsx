import { lazy, Suspense } from 'react';
import Banner from "./components/Banner";
import Loading from "./loading"; 
import TopCuisineDynamic from './components/TopCuisineDynamic';
import RestaurantSectionDynamic from './components/RestaurantSectionDynamic'; // Import the new wrapper
import PopularItemsDynamic from './components/PopularItemsDynamic'; 
// Lazy load all other non-critical components
const FAQSection = lazy(() => import("./components/FaqSection"));
const Stats = lazy(() => import("./components/Stats"));
const Services = lazy(() => import("./components/Service"));
const CTASection = lazy(() => import("./components/CTASection"));
const PopularBlogs = lazy(() => import("./components/PopularBlogs"));
const OurPartner = lazy(() => import("./components/OurPartner"));
const SpecialOffers = lazy(() => import("./components/SpecialOffers"));
const CustomersReview = lazy(() => import("./components/CustomersReview"));
const TraditionalBeersSection = lazy(() => import("./components/TraditionalBear"));
const CategorySection = lazy(() => import("./components/Category"));
const HowWeWork = lazy(() => import("./components/HowWeWork"));
// The original RestaurantSection is no longer lazy-loaded here
const FoodCompare = lazy(() => import("./components/FoodCompare"));
const AiDrivenFoodSuggestion = lazy(() => import("./components/AiDrivenFoodSuggession"));
const Slider = lazy(() => import("./components/Slider"));
const MarqueeSection = lazy(() => import("./components/MarqueeSection"));
const PopularItems = lazy(() => import("./components/PopularItems"));

// Create optimized loading components using your variants
const ComponentLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center bg-transparent">
    <Loading 
      size="lg" 
      variant="premium" 
      showText={false}
      className="bg-transparent"
    />
  </div>
);

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

export default function Home() {
  return (
    <div>
      {/* Critical - Load immediately (above the fold) */}
      <Banner />
      
      {/* Food Discovery Sections - Quick loading */}
      <Suspense fallback={<SectionLoader />}>
        <AiDrivenFoodSuggestion />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <SpecialOffers />
      </Suspense>
      
     <PopularItemsDynamic />
      
      {/* This component is already wrapped and handles its own loading */}
      <TopCuisineDynamic />
      
      <Suspense fallback={<SectionLoader />}>
        <MarqueeSection />
      </Suspense>
      
      {/* Interactive Sections - Medium priority */}
      <Suspense fallback={<SectionLoader />}>
        <FoodCompare />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TraditionalBeersSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CategorySection />
      </Suspense>
      
      {/* Content Sections - Lower priority */}
      <Suspense fallback={<SectionLoader />}>
        <PopularBlogs />
      </Suspense>
      
      {/* Use the new dynamic wrapper here. No Suspense is needed as it handles its own loading state. */}
      <RestaurantSectionDynamic />
      
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Stats />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Slider />
      </Suspense>
      
      {/* Informational Sections - Lowest priority */}
      <Suspense fallback={<SectionLoader />}>
        <HowWeWork />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <OurPartner />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CustomersReview />
      </Suspense>
    </div>
  );
}