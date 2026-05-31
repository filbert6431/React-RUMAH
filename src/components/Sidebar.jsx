import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { HiHome, HiMenu, HiUserCircle, HiLogout } from "react-icons/hi";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { AiFillUnlock, AiOutlineStop } from "react-icons/ai";
import { TbError404 } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

export default function Sidebar() {
  // Fungsi styling untuk NavLink
  const menuClass = ({ isActive }) =>
    `relative flex flex-col items-center p-3 transition-all duration-300 group
    ${isActive ? "text-dash-accent scale-110" : "text-gray-500 hover:text-dash-accent"}`;

  const iconClass = (isActive) =>
    isActive
      ? "text-dash-accent transition-colors"
      : "text-gray-500 group-hover:text-dash-accent transition-colors";

  return (
    <TooltipProvider delayDuration={100}>
      <div className="w-24 bg-dash-sidebar h-[95vh] my-[2.5vh] flex flex-col items-center py-8 rounded-r-[40px] shadow-xl justify-between border-r border-white/5">
        
        {/* Bagian Atas: Logo & Navigasi */}
        <div className="flex flex-col items-center gap-10 w-full">
          
          {/* Logo Cokelat */}
          <div className="bg-[#4A3728] p-3 rounded-full shadow-lg border border-white/10 hover:scale-110 transition-transform cursor-pointer">
            <span className="text-xl">☕</span>
          </div>

          <nav className="flex flex-col gap-4 w-full items-center">
            
            {/* Dashboard */}
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <HiHome size={28} className={iconClass(isActive)} />
                      {isActive && <ActiveIndicator />}
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            {/* Orders */}
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/orders" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <HiMenu size={28} className={iconClass(isActive)} />
                      {isActive && <ActiveIndicator />}
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>

            {/* Customers */}
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/Customer" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <BsFillPersonVcardFill size={28} className={iconClass(isActive)} />
                      {isActive && <ActiveIndicator />}
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>

            {/* Membership */}
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/Membership" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <HiUserCircle size={28} className={iconClass(isActive)} />
                      {isActive && <ActiveIndicator />}
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Membership</TooltipContent>
            </Tooltip>

            <div className="w-12 py-2">
              <Separator className="bg-white/10" />
            </div>

            {/* 404 Page */}
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/404" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <TbError404 size={28} className={iconClass(isActive)} />
                      {isActive && <ActiveIndicator />}
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">404 Page</TooltipContent>
            </Tooltip>

            {/* Forbidden */}
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/Forbidden" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <AiOutlineStop size={28} className={iconClass(isActive)} />
                      {isActive && <ActiveIndicator />}
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Forbidden</TooltipContent>
            </Tooltip>

            {/* Unauthorized */}
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/Unauthorized" className={menuClass}>
                  {({ isActive }) => (
                    <>
                      <AiFillUnlock size={28} className={iconClass(isActive)} />
                      {isActive && <ActiveIndicator />}
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Unauthorized</TooltipContent>
            </Tooltip>

          </nav>
        </div>

        {/* Bagian Bawah: Logout */}
        <div className="mb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-500 hover:text-red-500 transition-all p-3 hover:scale-110 active:scale-95">
                <HiLogout size={28} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

// Komponen kecil untuk garis aktif agar kode tidak terlihat berantakan
function ActiveIndicator() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-dash-accent rounded-l-full shadow-[0_0_10px_#D4B5A0]" />
  );
}