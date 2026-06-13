import { AiOutlineCoffee } from "react-icons/ai";
import { createElement, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { HiHome, HiMenu, HiUserCircle, HiLogout } from "react-icons/hi";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { AiFillUnlock, AiOutlineStop } from "react-icons/ai";
import { TbError404 } from "react-icons/tb";
import { FaCashRegister, FaUsers, FaStar, FaShoppingBag, FaTags } from "react-icons/fa";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <div
        ref={sidebarRef}
        onClick={() => setIsExpanded(true)}
        className={`bg-[#FDFBF7] h-[95vh] my-[2.5vh] flex flex-col items-center py-8 rounded-r-[40px] shadow-md justify-between border-r border-gray-100 transition-all duration-300 ease-in-out select-none cursor-pointer ${isExpanded ? "w-64" : "w-24"
          }`}
      >
        {/* Bagian Atas: Logo & Navigasi */}
        <div className="flex flex-col items-center gap-8 w-full overflow-x-hidden">

          {/* Logo Cokelat yang Dinamis mengikuti isExpanded */}
          <div className={`bg-[#4A3728] rounded-2xl shadow-md border border-white/10 hover:rotate-12 transition-all duration-300 flex items-center justify-center ${isExpanded
              ? "w-20 h-20 p-4"  // <--- Ukuran JAUH LEBIH BESAR saat sidebar Terbuka (Expand)
              : "w-12 h-12 p-3"  // <--- Ukuran normal yang pas saat sidebar Menciut (Collapse)
            }`}>
            <span className={`transition-all duration-300 ${isExpanded
                ? "text-5xl text-white" // <--- Ikon kopi ikut membesar drastis saat expand
                : "text-2xl text-white/90"
              }`}>
              <AiOutlineCoffee />
            </span>
          </div>

          <nav className="flex flex-col gap-2 w-full px-3">

            {/* --- MENU UTAMA --- */}
            <SidebarItem to="/" label="Dashboard" icon={HiHome} isExpanded={isExpanded} />
            <SidebarItem to="/pos" label="POS" icon={FaCashRegister} isExpanded={isExpanded} />
            <SidebarItem to="/orders" label="Orders" icon={HiMenu} isExpanded={isExpanded} />
            <SidebarItem to="/Customer" label="Customers" icon={BsFillPersonVcardFill} isExpanded={isExpanded} />
            <SidebarItem to="/Staff" label="Staff" icon={FaUsers} isExpanded={isExpanded} />
            <SidebarItem to="/Promo" label="Promo" icon={FaTags} isExpanded={isExpanded} />
            <SidebarItem to="/Reviews" label="Reviews" icon={FaStar} isExpanded={isExpanded} />
            <SidebarItem to="/Products" label="Products" icon={FaShoppingBag} isExpanded={isExpanded} />
            {/* Garis Pembatas (Separator) */}
            <div className="py-2 flex justify-center w-full">
              <Separator className={`bg-[#4A3728]/10 transition-all duration-300 ${isExpanded ? "w-full" : "w-1/2"}`} />
            </div>

            {/* --- MENU SISTEM --- */}
            <SidebarItem to="/404" label="404 Page" icon={TbError404} isExpanded={isExpanded} />
            <SidebarItem to="/Forbidden" label="Forbidden" icon={AiOutlineStop} isExpanded={isExpanded} />
            <SidebarItem to="/Unauthorized" label="Unauthorized" icon={AiFillUnlock} isExpanded={isExpanded} />

          </nav>
        </div>



        {/* Bagian Bawah: Logout */}
        <div className="w-full px-3 mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to="/Login" className={`group flex w-full items-center gap-4 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 p-3 rounded-xl active:scale-95 ${isExpanded ? "justify-start px-4" : "justify-center"
                }`}>
                <HiLogout size={24} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
                <span className={`whitespace-nowrap text-sm font-semibold transition-all duration-300 ${isExpanded ? "opacity-100 max-w-none" : "opacity-0 max-w-0 overflow-hidden"
                  }`}>
                  Logout
                </span>
              </NavLink>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">Logout</TooltipContent>}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

function SidebarItem({ to, label, icon, isExpanded }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) => `
            relative flex w-full items-center gap-4 p-3 rounded-2xl transition-all duration-200 group
            ${isExpanded ? "justify-start px-5" : "justify-center"}
            ${isActive
              ? "text-white bg-[#5C4636] font-semibold shadow-md"
              : "text-gray-500 hover:bg-[#4A3728]/5 hover:text-[#4A3728]"}
          `}
        >
          {({ isActive }) => (
            <>
              {/* Icon Menu */}
              {createElement(icon, {
                size: 32,
                className: `shrink-0 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-400 group-hover:text-[#4A3728]"}`,
              })}

              {/* Teks Menu */}
              <span className={`whitespace-nowrap text-sm transition-all duration-300 ease-in-out ${isExpanded ? "opacity-100 max-w-none translate-x-0" : "opacity-0 max-w-0 overflow-hidden -translate-x-2"
                }`}>
                {label}
              </span>

              {/* Garis Merah/Cokelat Aktif di Sebelah Kanan */}
              {isActive && <ActiveIndicator />}
            </>
          )}
        </NavLink>
      </TooltipTrigger>
      {!isExpanded && (
        <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
          {label}
        </TooltipContent>
      )}
    </Tooltip>
  );
}

function ActiveIndicator() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-8 bg-[#D32F2F] rounded-l-lg" />
  );
}
