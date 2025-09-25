import Banner from "./menu/components/banner";
import SidebarComponent from "./menu/components/sidebar";
const MenuLayout = ({ children }) => {
  return (
    <div>
      <Banner />
      <div className="flex flex-12 gap-2">
        <div className="col-span-4">
          <SidebarComponent />
        </div>
        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
};

export default MenuLayout;
