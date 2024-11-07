import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { IoMailSharp, IoNotifications } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const TopBar = () => {
    return (
        <div className="bg-[#463684] lg:h-[100px] lg:flex justify-between items-center py-2 gap-5 px-20">
            <div className="lg:w-2/5">
                <h1 className="text-xl font-semibold text-[#F8F8F8]">Dashboard</h1>
            </div>

            <div className="lg:flex justify-between items-center gap-10 lg:w-3/5">
                <div className="border-r-2 pr-5">
                  <Menubar className="h-[60px] border-none bg-[#463684]">
                  <MenubarMenu>
                      <MenubarTrigger>
                        <div className="bg-[#F0F4FA] h-[50px] w-[50px] rounded-md flex justify-center items-center">
                            <IoMailSharp className=" text-[#459895] w-[25px] h-[18.75px]"></IoMailSharp>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="p-4 max-w-[400px]">
                        <h1 className=" mb-2 font-semibold">Mail Notifications</h1>
                      </MenubarContent>
                    </MenubarMenu>
    
                    <MenubarMenu>
                      <MenubarTrigger>
                        <div className="bg-[#F0F4FA] h-[50px] w-[50px] rounded-md flex justify-center items-center">
                        <IoNotifications className=" text-[#459895] w-[25px] h-[18.75px]"></IoNotifications>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="p-4 max-w-[400px]">
                        <h1 className="mb-2 font-semibold">Bail Notifications</h1>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
    
                <div>
                    <Select>
                      <SelectTrigger className="lg:w-[326px] h-[60px] mt-5 md:mt-0 lg:mt-0 xl:mt-0">
                        <SelectValue placeholder="Select a employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Employees</SelectLabel>
                          <SelectItem value="employees">
                            <div className="flex items-center justify-center gap-10">
                                <img className="w-[40px] h-[40px]" src="https://i.ibb.co.com/fCx3Y8R/Ellipse-1.webp" alt="" />
                                <h1 className="text-xs font-normal">Revia Desos</h1>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default TopBar;