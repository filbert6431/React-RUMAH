import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout() {
  return (
    /* Menggunakan #3D2B1F (Warm Chocolate) yang lebih terang dan hidup */
    <div className="flex h-screen w-full bg-[#E2D9C8]  overflow-hidden font-barlow relative">
      
      {/* Overlay tekstur kayu/grainy halus agar tidak flat */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]"></div>
      
      {/* 1. Sidebar: Menggunakan warna cokelat yang lebih pekat untuk kontras */}
      <aside className="w-24 shrink-0 bg-dash-sidebar border-r border-white/10 z-20 shadow-2xl">
        <Sidebar />
      </aside>

      {/* 2. Main Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden px-8 py-4 relative z-10">
        
        {/* Header */}
        <header className="h-20 shrink-0 flex items-center">
          <div className="w-full">
            <Header />
          </div>
        </header>

        {/* Content Area: Menggunakan warna 'Creamy Latte' transparan */}
        <main className="flex-1 overflow-y-auto scrollbar-hide mt-4 bg-[#E2D9C8]/60 backdrop-blur-md rounded-[40px] p-8 border border-white/10 shadow-2xl">
          {/* Outlet merender Dashboard/Orders */}
          <Outlet />
        </main>

      </div>
    </div>
  );
}