import Banner from "./components/Banner";
import FAQSection from "./components/FaqSection";
import Stats from "./components/Stats";
import Services from "./components/Service";
import CTASection from "./components/CTASection";
import NewsLetter from "./components/NewsLetter";
import PopularBlogs from "./components/PopularBlogs";
import OurPartner from "./components/OurPartner";
import SpecialOffers from "./components/SpecialOffers";
import CustomersReview from "./components/CustomersReview";
import TraditionalBeersSection from "./components/TraditionalBear";
import CategorySection from "./components/Category";
import HowWeWork from "./components/HowWeWork";

import RestaurantSection from "./components/RestaurantSection";
import FoodCompare from "./components/FoodCompare";
import PrivacyPolicy from "@/components/ui/PrivacyPolicy";
import CareerOpportunities from "./components/CareerOpportunities";

export default function Home() {
  return (
    <div>
      <Banner />
      <SpecialOffers />
      <FoodCompare/>
      <TraditionalBeersSection></TraditionalBeersSection>
      <CategorySection />
      <PopularBlogs />
      <RestaurantSection/>
      <CTASection />
      <Stats />
      <HowWeWork />
      <FAQSection />
      <Services />

      <OurPartner />
      {/* <CareerOpportunities/> */}
      <CustomersReview />
      {/* <PrivacyPolicy/> */}

      {/* <NewsLetter /> */}
    </div>
  );
}
