import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { FaBullhorn, FaCalendarCheck, FaMapMarkerAlt, FaUserClock } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";
import { NavLink } from "react-router-dom";


const SideBar = () => {
  const dispatch = useAppDispatch()

  //handle logout
  const handleLogout = () =>{
    dispatch(logout())
  }

    return (
        <aside className=" bg-[#F0F4FA] text-[#54246D] col-span-2 h-full sticky py-5 border-r">
          <nav className="flex flex-col gap-2 px-4 lg:px-5 py-1">
    
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cn(
                      "p-2 lg:h-[75px] rounded-lg transition-all flex gap-3 items-center justify-start lg:pl-8",
                      {
                        "text-[#F8F8F8] bg-[#463684]": isActive,
                      }
                    )
                  }
                >
                  <IoSave className="shrink-0 w-[25px] h-[25px]"></IoSave>
                  <span className="truncate text-xs font-normal">Dashboard</span>
                </NavLink>
                <NavLink
                  to="/attendance"
                  className={({ isActive }) =>
                    cn(
                      "p-2 lg:h-[75px] rounded-lg transition-all flex gap-3 items-center justify-start lg:pl-8",
                      {
                        "text-[#F8F8F8] bg-[#463684]": isActive,
                      }
                    )
                  }
                >
                  <FaCalendarCheck className="shrink-0 w-[25px] h-[25px]"></FaCalendarCheck>
                  <span className="truncate text-xs font-normal">Attendance</span>
                </NavLink>
                <NavLink
                  to="/leave"
                  className={({ isActive }) =>
                    cn(
                      "p-2 lg:h-[75px] rounded-lg transition-all flex gap-3 items-center justify-start lg:pl-8",
                      {
                        "text-[#F8F8F8] bg-[#463684]": isActive,
                      }
                    )
                  }
                >
                  <FaUserClock className="shrink-0 w-[25px] h-[25px]"></FaUserClock>
                  <span className="truncate text-xs font-normal">Leave</span>
                </NavLink>
                <NavLink
                  to="/salary"
                  className={({ isActive }) =>
                    cn(
                      "p-2 lg:h-[75px] rounded-lg transition-all flex gap-3 items-center justify-start lg:pl-8",
                      {
                        "text-[#F8F8F8] bg-[#463684]": isActive,
                      }
                    )
                  }
                >
                  <FaBullhorn className="shrink-0 w-[25px] h-[25px]"></FaBullhorn>
                  <span className="truncate text-xs font-normal">Salary</span>
                </NavLink>
                <NavLink
                  to="/announcement"
                  className={({ isActive }) =>
                    cn(
                      "p-2 lg:h-[75px] rounded-lg transition-all flex gap-3 items-center justify-start lg:pl-8",
                      {
                        "text-[#F8F8F8] bg-[#463684]": isActive,
                      }
                    )
                  }
                >
                  <FaBullhorn className="shrink-0 w-[25px] h-[25px]"></FaBullhorn>
                  <span className="truncate text-xs font-normal">Announcement</span>
                </NavLink>
                <NavLink
                  to="/geo-fencing"
                  className={({ isActive }) =>
                    cn(
                      "p-2 lg:h-[75px] rounded-lg transition-all flex gap-3 items-center justify-start lg:pl-8",
                      {
                        "text-[#F8F8F8] bg-[#463684]": isActive,
                      }
                    )
                  }
                >
                  <FaMapMarkerAlt className="shrink-0 w-[25px] h-[25px]"></FaMapMarkerAlt>
                  <span className="truncate text-xs font-normal">Geo-Fencing</span>
                </NavLink>

                <NavLink onClick={handleLogout}
                  to="/"
                  className={({ isActive }) =>
                    cn(
                      "p-2 lg:h-[75px] rounded-lg transition-all flex gap-3 items-center justify-start lg:pl-8",
                      {
                        "text-[#F8F8F8] bg-[#463684]": isActive,
                      }
                    )
                  }
                >
                  <FaArrowRightFromBracket className="shrink-0 w-[25px] h-[25px]"></FaArrowRightFromBracket>
                  <span className="truncate text-xs font-normal">Logout</span>
                </NavLink>     
    
          </nav>
        </aside>
    );
};

export default SideBar;