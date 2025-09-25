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

export default function Home() {
  return (
    <div className="max-w-[1500px] mx-auto pt-18 px-4 lg:px-0">
      <Banner />
      <SpecialOffers />
      <Stats />
      <CTASection />
      <Services />
      <PopularBlogs />
      <OurPartner />
      <FAQSection />
      <CustomersReview />
      <NewsLetter />
    </div>
  );
}
