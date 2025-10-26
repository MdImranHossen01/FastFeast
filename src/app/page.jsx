import Banner from "./components/Banner";
import FAQSection from "./components/FaqSection";
import Stats from "./components/Stats";
import Services from "./components/Service";
import CTASection from "./components/CTASection";
import PopularBlogs from "./components/PopularBlogs";
import OurPartner from "./components/OurPartner";
import SpecialOffers from "./components/SpecialOffers";
import CustomersReview from "./components/CustomersReview";
import TraditionalBeersSection from "./components/TraditionalBear";
import CategorySection from "./components/Category";
import HowWeWork from "./components/HowWeWork";

import RestaurantSection from "./components/RestaurantSection";
import FoodCompare from "./components/FoodCompare";
import AiDrivenFoodSuggestion from "./components/AiDrivenFoodSuggession";
import Slider from "./components/Slider";
import MarqueeSection from "./components/MarqueeSection";
import TopCuisine from "./components/TopCuisine";

export default function Home() {
  return (
    <div>
      <Banner />
      <AiDrivenFoodSuggestion />
      <SpecialOffers />
      <TopCuisine/>
      <MarqueeSection/>
      <FoodCompare />
      <TraditionalBeersSection/>
      <CategorySection />
      <PopularBlogs />
      <RestaurantSection />
      <CTASection />
      <Stats />
      <Slider />
      <HowWeWork />
      <Services />
      <FAQSection />
      <OurPartner />
      {/* <CareerOpportunities/> */}
      <CustomersReview />
      {/* <PrivacyPolicy/> */}
      {/* <NewsLetter /> */}
    </div>
  );
}
