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

export default function Home() {
  return (
    <div>
      <Banner />
      {/* <SpecialOffers /> */}
      <TraditionalBeersSection></TraditionalBeersSection>
      <CategorySection/>
      <PopularBlogs />
      <CTASection />
      <Services />
      
      <OurPartner />
      <Stats />
      <FAQSection />
      
      <CustomersReview />
      {/* <NewsLetter /> */}
    </div>
  );
}
