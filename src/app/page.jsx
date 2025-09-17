import Banner from "./components/Banner";
import FAQSection from "./components/FaqSection";
import SpecialOffers from "./components/SpecialOffers";
import Stat from "./components/Stat";

export default function Home() {
  return (
    <>
      <Banner />
      <SpecialOffers />
      <FAQSection />
      <Stat />
      <Service />
    </>
  );
}
