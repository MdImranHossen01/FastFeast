import SidebarComponent from "./components/sidebar";

const MenuLayout = ({children}) => {
    return (
       <div className="flex flex-12 gap-2">
        <div className="col-span-3">
            <SidebarComponent/>
        </div>
         <div className="col-span-8">
            {children}
        </div>
       </div>
    );
};

export default MenuLayout;