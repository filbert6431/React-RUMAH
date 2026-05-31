import React from 'react';
import { FaStar, FaEdit, FaTrash, FaWallet, FaShoppingCart, FaUserFriends, FaFire } from 'react-icons/fa';
import OverviewCards from "../components/OverviewCards";
import QuickActions from "../components/QuickActions";
import OrderPanel from "../components/OrderPanel";
import ActivityFeed from "../components/ActivityFeed";

export default function Dashboard() {
  const menuKopi = [
    { id: 1, name: "Machiato", rating: 4.9, review: 680, price: "24.000,00", desc: "Caffe macchiato adalah minuman kopi yang dibuat dengan mencampurkan espresso dengan susu.", img: "https://images.unsplash.com/photo-1572288651111-bf7ecd892850?w=300" },
    { id: 2, name: "Mocha", rating: 4.8, review: 520, price: "26.000,00", desc: "Caffe mocha adalah minuman kopi yang terbuat dari campuran espresso dengan coklat dan susu.", img: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?w=300" },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* SECTION 1: SUMMARY STATS (Kiri ke Kanan) */}
      <OverviewCards />

      {/* SECTION 2: MAIN CONTENT (Menu & Order Panel) */}
      <div className="flex h-full gap-6 overflow-hidden">
        
        {/* LEFT: MENU SECTION (75%) */}
        <div className="flex-[3] overflow-y-auto pr-4 scrollbar-hide pb-10">
          
          {/* Kategori Filter */}
          <QuickActions />

          <h2 className="text-2xl font-bold text-white mb-6">Menu Kopi</h2>

          {/* Grid Menu - Menggunakan Warna Krem Gelap Agar Konsisten */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {menuKopi.map((item) => (
              <div key={item.id} className="bg-[#E5D9D0] rounded-[32px] p-5 flex flex-col gap-4 relative shadow-2xl text-gray-800">
                <div className="absolute top-4 right-5 flex gap-2 text-gray-400">
                  <FaEdit className="cursor-pointer hover:text-dash-accent transition" />
                  <FaTrash className="cursor-pointer hover:text-red-500 transition" />
                </div>

                <div className="flex gap-4">
                  <img src={item.img} className="w-24 h-24 rounded-2xl object-cover shadow-md" alt={item.name} />
                  <div className="flex-1">
                    <h3 className="font-black text-xl text-[#2D2825]">{item.name}</h3>
                    <p className="text-[11px] text-gray-500 leading-tight mt-1 font-medium">{item.desc}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center px-2 py-3 border-y border-black/5">
                   <div>
                     <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Rating</p>
                     <div className="flex items-center gap-1 font-bold text-sm">
                       <FaStar className="text-orange-500" /> {item.rating}
                     </div>
                   </div>
                   <div className="text-center">
                     <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Review</p>
                     <p className="font-bold text-sm">({item.review})</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Harga</p>
                     <p className="font-black text-sm font-Poppins text-dash-accent">Rp {item.price}</p>
                   </div>
                </div>

                {/* Size Selection */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Pilih Size</p>
                    <div className="flex gap-2">
                      {['S', 'M', 'L'].map(size => (
                        <button key={size} className={`w-9 h-8 rounded-xl text-xs font-black transition ${size === 'M' ? 'bg-[#2D2825] text-white shadow-lg' : 'bg-white/50 text-gray-600 hover:bg-white'}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="bg-dash-accent text-white px-6 py-3 rounded-2xl text-[10px] font-black shadow-lg hover:brightness-110 active:scale-95 transition uppercase tracking-tighter">
                    + Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: ORDER PANEL (25%) */}
        <OrderPanel />

      </div>
    </div>
  );
}