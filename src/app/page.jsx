import Image from "next/image";
import Banner from "./components/Banner";
import FAQSection from "./components/FaqSection";
import SpecialOffers from "./components/SpecialOffers";

export default function Home() {
  return (
    <>
    <Banner/>
    <SpecialOffers/>
    <FAQSection/>
    </>
  );
}
