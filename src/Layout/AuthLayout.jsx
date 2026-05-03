import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    // Satu-satunya pembungkus utama di seluruh halaman Auth
    <div className="min-h-screen w-full flex items-center justify-center bg-[#141414] relative overflow-hidden p-4 md:p-8">
      
      {/* Background Decor (Ambient Light) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-dash-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8B5E52]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Komponen Login/Register akan muncul di sini */}
      <div className="z-10 w-full flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}