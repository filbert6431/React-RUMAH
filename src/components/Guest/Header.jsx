import { Link, NavLink } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";

export default function Header({ onLoginClick }) {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/AboutUs" },
    { name: "Menu", path: "/Menu" },
    { name: "Reviews", path: "/Review_Guest" },
    { name: "Contact", path: "/ContactUs" },
    { name: "Member", path: "/member-login" },
  ];

  return (
    <div className="w-full">
      {/* MAIN NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#1A1614]/95 backdrop-blur-md text-white py-4 px-6 md:px-16 flex justify-between items-center shadow-lg">
        <Link to="/" className="bg-[#967259] p-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-md">
          <FaCoffee className="text-xl" />
          <span className="font-bold tracking-tight">Coffee</span>
        </Link>

        <nav className="hidden md:flex gap-8 font-medium text-sm text-white/90">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-amber-500 font-bold border-b-2 border-amber-500 pb-1"
                  : "hover:text-amber-500 transition-colors"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center">
          <button 
            onClick={onLoginClick} // Menggunakan Props Fungsi untuk Navigasi
            className="bg-[#967259] hover:bg-[#7e5e47] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* MOBILE NAVBAR */}
      <nav className="flex flex-wrap md:hidden justify-center gap-5 bg-[#1A1614] px-6 py-3 text-sm font-medium text-white/90">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 font-bold"
                : "hover:text-amber-500 transition-colors"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
