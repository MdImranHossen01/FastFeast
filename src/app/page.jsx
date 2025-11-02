// src/app/page.jsx
import { lazy, Suspense } from "react";

import Banner from "./components/Banner";
import Loading from "./loading";

import TopCuisineDynamic from "./components/TopCuisineDynamic";
import RestaurantSectionDynamic from "./components/RestaurantSectionDynamic";
import PopularItemsDynamic from "./components/PopularItemsDynamic";
import SpecialOffers from "./components/SpecialOffers";

// Lazy load non-critical components (SSR OK)
const FAQSection = lazy(() => import("./components/FaqSection"));
const Stats = lazy(() => import("./components/Stats"));
const Services = lazy(() => import("./components/Service"));
const CTASection = lazy(() => import("./components/CTASection"));
const PopularBlogs = lazy(() => import("./components/PopularBlogs"));
const OurPartner = lazy(() => import("./components/OurPartner"));
const CustomersReview = lazy(() => import("./components/CustomersReview"));
const TraditionalBeersSection = lazy(() =>
  import("./components/TraditionalBear")
);
const HowWeWork = lazy(() => import("./components/HowWeWork"));
const FoodCompare = lazy(() => import("./components/FoodCompare"));
const AiDrivenFoodSuggestion = lazy(() =>
  import("./components/AiDrivenFoodSuggession")
);
const MarqueeSection = lazy(() => import("./components/MarqueeSection"));
// const PopularItems = lazy(() => import("./components/PopularItems")); // using PopularItemsDynamic instead

// Loaders
const ComponentLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <Loading />
  </div>
);

const SectionLoader = () => (
  <div className="min-h-[300px] flex items-center justify-center rounded-lg">
    <Loading />
  </div>
);

export default function Home() {
  return (
    <div>
    
      <Banner />
      {/* Food Discovery Sections - Quick loading */}
      <Suspense fallback={<SectionLoader />}>
        <AiDrivenFoodSuggestion />
      </Suspense>

      {/* Client-only; DO NOT wrap in <Suspense> */}
      <SpecialOffers />

      <PopularItemsDynamic />

      {/* Already wrapped and handles its own loading */}
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

     

      {/* Content Sections - Lower priority */}
      <Suspense fallback={<SectionLoader />}>
        <PopularBlogs />
      </Suspense>

      {/* Uses its own dynamic wrapper; no Suspense needed here */}
      <RestaurantSectionDynamic />

      {/* <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
        <Stats />
      </Suspense>

      

      {/* Informational Sections - Lowest priority */}
      {/* <Suspense fallback={<SectionLoader />}>
        <HowWeWork />
      </Suspense> */}

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
