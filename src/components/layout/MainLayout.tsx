import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";


const MainLayout = () => {
    return (
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-2 text-[#F8F8F8] bg-[#463684] text-center font-bold text-xl flex items-center justify-center">
                  <a className="truncate p-1 flex items-center gap-2" href="/">
                    <img className="w-[60px] rounded-lg" src="https://i.ibb.co.com/q9j9Y76/PMS-LOGO-1.webp" alt="" />
                  </a>
                </div>
                <div className="col-span-10 h-full">
                    <TopBar/>
                </div>
            </div>
            <div className="grid grid-cols-12 bg-[#F0F4FA]">
                <SideBar></SideBar>
                
                <div className="col-span-10 h-full p-5">
                <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;