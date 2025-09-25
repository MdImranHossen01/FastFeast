import Banner from "./menu/components/Banner";
import SidebarComponent from "./menu/components/SidebarComponent";
const MenuLayout = ({ children }) => {
  return (
    <div>
      <Banner />
      <div className="grid grid-cols-12 gap-2">

        <div className="col-span-2">
          <SidebarComponent />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </div>
  );
};

export default MenuLayout;
