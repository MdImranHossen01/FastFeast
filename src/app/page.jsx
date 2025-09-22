import Banner from "./components/Banner";
import FAQSection from "./components/FaqSection";
import Stats from "./components/Stats";
import Services from "./components/Service";
import CTASection from "./components/CTASection";
import NewsLetter from "./components/NewsLetter";
import PopularBlogs from "./components/PopularBlogs";
import SpecialOffers from "./components/SpecialOffers";

export default function Home() {
  return (
    <>
      <Banner />
      <SpecialOffers />
      <FAQSection />
      <Stats />
      <CTASection />
      <Services />
      <PopularBlogs />
      <NewsLetter />
    </>
  );
}
