import { AiFillUnlock } from "react-icons/ai"; 
import { BsFillSignNoLeftTurnFill } from "react-icons/bs"; 
import { AiOutlineStop } from "react-icons/ai"; 
import { TbError404 } from "react-icons/tb"; 
import { NavLink } from "react-router-dom";
// Saya menggunakan react-icons karena di gambar hanya menggunakan ikon
import { HiHome, HiOutlineTicket, HiMenu, HiUserCircle, HiLogout } from "react-icons/hi";

export default function Sidebar() {
  // Fungsi styling untuk NavLink agar aktif sesuai gambar
  const menuClass = ({ isActive }) =>
    `relative flex flex-col items-center p-3 transition-all duration-300 group
    ${isActive ? "text-dash-accent scale-110" : "text-gray-500 hover:text-dash-accent"}`;

  return (
    <div className="w-24 bg-dash-sidebar h-[95vh] my-[2.5vh] flex flex-col items-center py-8 rounded-r-[40px] shadow-xl justify-between">

      {/* Bagian Atas: Logo & Menu */}
      <div className="flex flex-col items-center gap-12 w-full">
        {/* Logo Bulat seperti di gambar */}
        <div className="bg-white p-3 rounded-full shadow-md">
          <span className="text-xl">☕</span>
        </div>

        {/* Menu Navigasi Ikon */}
        <nav className="flex flex-col gap-8 w-full items-center">

          <NavLink to="/" className={menuClass}>
            {({ isActive }) => (
              <>
                <HiHome size={28} />
                {isActive && <div className="absolute -right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full" />}
              </>
            )}
          </NavLink>


          <NavLink to="/orders" className={menuClass}>
            {({ isActive }) => (
              <>
                <HiMenu size={28} />
                {isActive && <div className="absolute -right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full" />}
              </>
            )}
          </NavLink>

          <NavLink to="/Membership" className={menuClass}>
            {({ isActive }) => (
              <>
                <HiUserCircle size={28} />
                {isActive && <div className="absolute -right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full" />}
              </>
            )}
          </NavLink>


          <NavLink to="/*" className={menuClass}>
            {({ isActive }) => (
              <>
                <TbError404 size={28} />
                {isActive && <div className="absolute -right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full" />}
              </>
            )}
          </NavLink>


          <NavLink to="/Forbidden" className={menuClass}>
            {({ isActive }) => (
              <>
                <AiOutlineStop  size={28} />
                {isActive && <div className="absolute -right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full" />}
              </>
            )}
          </NavLink>


          <NavLink to="/Unauthorized" className={menuClass}>
            {({ isActive }) => (
              <>
                < AiFillUnlock size={28} />
                {isActive && <div className="absolute -right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full" />}
              </>
            )}
          </NavLink>

        </nav>
      </div>

      {/* Bagian Bawah: Logout */}
      <div className="mb-4">
        <button className="text-gray-500 hover:text-red-500 transition-colors p-3">
          <HiLogout size={28} />
        </button>
      </div>
    </div>
  );
}