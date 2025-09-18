import Banner from "./components/Banner";
import FAQSection from "./components/FaqSection";
import SpecialOffers from "./components/SpecialOffers";
import Stats from "./components/Stats";
import Services from "./components/Service";

export default function Home() {
  return (
    <>
      <Banner />
      <SpecialOffers />
      <FAQSection />
      <Stats />
      <Services />
    </>
  );
}
