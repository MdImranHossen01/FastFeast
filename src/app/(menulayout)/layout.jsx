import Banner from "./menu/components/banner";
import FavouriteFood from "./menu/components/FavouriteFood";
import SidebarComponent from "./menu/components/SidebarComponent";
import StoreProvider from "@/lib/StoreProvider";
const MenuLayout = ({ children }) => {
  return (
   
    <StoreProvider>
      <div>
        <div className="container mx-auto grid grid-cols-12 gap-4 pt-18">
          <div className="col-span-12 md:col-span-3">
            <SidebarComponent />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Banner />
            <FavouriteFood/>
            {children}
            </div>
        </div>
      </div>
    </StoreProvider>
  );
};

export default MenuLayout;