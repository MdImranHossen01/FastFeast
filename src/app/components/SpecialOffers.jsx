import getOffers from "../actions/offers/getOffers";
import SpecialOffersSlider from "./SpecialOffersSlider";

export default async function SpecialOffers() {
  const offers = await getOffers();
 
  return (
    <section className="py-14 container mx-auto px-4 bg-orange-50">
      <div className="text-center mb-12">
        <h2 className="mb-4 text-4xl font-bold text-gray-800">
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
