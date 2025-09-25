import getOffers from "../actions/offers/getOffers";
import SpecialOffersSlider from "./SpecialOffersSlider";

export default async function SpecialOffers() {
  const offers = await getOffers();

  return (
    <section className="pt-12 pb-6 lg:py-16">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          Special <span className="text-orange-500">Offers</span>
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
