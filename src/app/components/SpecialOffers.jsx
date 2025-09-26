import getOffers from "../actions/offers/getOffers";
import SpecialOffersSlider from "./SpecialOffersSlider";

export default async function SpecialOffers() {
  const offers = await getOffers();

  return (
    <section className="py-14 container mx-auto px-4 bg-slate-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Special Offers
        </h2>
        <p className="text-gray-600 mt-2">
          Delicious deals you don’t want to miss. Limited time only!
        </p>
      </div>

      {/* Client slider for interactivity */}
      <SpecialOffersSlider offers={offers} />
    </section>
  );
}
