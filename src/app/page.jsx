import Image from "next/image";
import Banner from "./components/Banner";
import FAQSection from "./components/FaqSection";
import SpecialOffers from "./components/SpecialOffers";
import Stat from "./components/Stat";
import Service from "./components/Service";

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
