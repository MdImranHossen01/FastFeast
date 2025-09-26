import getOffers from "../actions/offers/getOffers";
import SpecialOffersSlider from "./SpecialOffersSlider";

export default async function SpecialOffers() {
  const offers = await getOffers();

  return (
    <section className="pt-16 lg:pt-24 pb-8 lg:pb-12 container mx-auto px-4 lg:px-0">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Special <span className="text-orange-500">Offers</span>
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Delicious deals you don’t want to miss. Limited time only!
        </p>
      </div>

      {/* Client slider for interactivity */}
      <SpecialOffersSlider offers={offers} />
    </section>
  );
}
