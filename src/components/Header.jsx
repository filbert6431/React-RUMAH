import { FaBell, FaSearch, FaPlus } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex items-center justify-between  bg-dash-header text-white py-4 px-2">
      
      {/* 1. Welcome Text (Sisi Kiri) */}
      <div className="flex flex-col">
        <p className="text-xs text-gray-400  font-semibold  ">
          Selamat datang di Doge Coffee Dashboard!
        </p>
        <h1 className="text-2xl font-semibold tracking-wide ">
          Always give the best service
        </h1>
      </div>

      {/* 2. Search & Right Section */}
      <div className="flex items-center gap-6 flex-1 justify-end">
        
        {/* Search Bar (Cokelat Gelap) */}
        <div className="relative flex items-center bg-dash-search px-4 py-2 rounded-2xl w-full max-w-xs transition-all focus-within:ring-1 focus-within:ring-dash-accent">
          <input  
            type="text"
            placeholder="cari menu"
            className="bg-transparent outline-none w-full text-sm text-gray-200 placeholder-gray-400"
          />
          <FaSearch className="text-gray-400 text-sm ml-2" />
        </div>

        {/* Notification Icon */}
        <div className="relative p-2 bg-transparent cursor-pointer">
          <FaBell className="text-xl text-gray-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-dash-dark"></span>
        </div>

        {/* Profile Admin (Diego) */}
        <div className="flex items-center gap-3">
          <img
            src="https://avatar.iran.liara.run/public/31" // Ganti dengan avatar doge jika ada
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-dash-accent object-cover"
          />
          <div className="text-xs">
            <p className="text-gray-400">admin</p>
            <p className="font-bold">Diego</p>
          </div>
        </div>

        {/* Add Menu Button (Gaya Minimalis) */}
        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-2xl transition text-xs border border-white/20">
          <FaPlus size={10} />
          Add menu
        </button>

      </div>
    </div>
  );
}