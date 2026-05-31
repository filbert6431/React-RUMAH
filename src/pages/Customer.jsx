import React from 'react';
import { FaStar, FaEdit, FaTrash, FaWallet, FaShoppingCart, FaUserFriends, FaFire } from 'react-icons/fa';

export default function Dashboard() {
  const menuKopi = [
    { id: 1, name: "Machiato", rating: 4.9, review: 680, price: "24.000,00", desc: "Caffe macchiato adalah minuman kopi yang dibuat dengan mencampurkan espresso dengan susu.", img: "https://images.unsplash.com/photo-1572288651111-bf7ecd892850?w=300" },
    { id: 2, name: "Mocha", rating: 4.8, review: 520, price: "26.000,00", desc: "Caffe mocha adalah minuman kopi yang terbuat dari campuran espresso dengan coklat dan susu.", img: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?w=300" },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* SECTION 1: SUMMARY STATS (Kiri ke Kanan) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Sales */}
        <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center text-xl">
            <FaWallet />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Sales</p>
            <p className="text-white text-lg font-black font-Poppins">Rp 4.250.000</p>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-xl">
            <FaShoppingCart />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Orders</p>
            <p className="text-white text-lg font-black font-Poppins">156 Order</p>
          </div>
        </div>

        {/* Card 3: New Members */}
        <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center text-xl">
            <FaUserFriends />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">New Members</p>
            <p className="text-white text-lg font-black font-Poppins">12 Member</p>
          </div>
        </div>

        {/* Card 4: Best Seller */}
        <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center text-xl">
            <FaFire />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Best Seller</p>
            <p className="text-white text-lg font-black font-Poppins">Machiato</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: MAIN CONTENT (Menu & Order Panel) */}
      <div className="flex h-full gap-6 overflow-hidden">
        
        {/* LEFT: MENU SECTION (75%) */}
        <div className="flex-[3] overflow-y-auto pr-4 scrollbar-hide pb-10">
          
          {/* Kategori Filter */}
          <div className="flex gap-4 mb-8">
            <button className="bg-[#2D2825] text-white/70 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-sm font-bold transition hover:bg-white/10">
              <span>🍦</span> Topping
            </button>
            <button className="bg-dash-accent text-white px-8 py-3 rounded-2xl flex items-center gap-2 shadow-lg font-bold">
              <span>☕</span> Kopi
            </button>
            <button className="bg-[#2D2825] text-white/70 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-sm font-bold transition hover:bg-white/10">
              <span>🫘</span> Bubuk
            </button>
            <button className="bg-[#2D2825] text-white/70 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-sm font-bold transition hover:bg-white/10">
              <span>🥐</span> Snack
            </button>
          </div>

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
        <aside className="flex-[1.2] bg-[#E5D9D0] rounded-[40px] p-6 flex flex-col shadow-2xl border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-[#2D2825]">Pesanan</h2>
            <span className="bg-[#2D2825] text-white px-3 py-1 rounded-lg font-bold text-[10px]">#8821</span>
          </div>

          {/* Delivery Tabs */}
          <div className="flex bg-black/5 p-1.5 rounded-2xl mb-6">
            <button className="flex-1 py-2 text-[10px] font-black rounded-xl text-gray-500 uppercase">Dine in</button>
            <button className="flex-1 py-2 text-[10px] font-black rounded-xl bg-dash-accent text-white shadow-md uppercase">Delivery</button>
            <button className="flex-1 py-2 text-[10px] font-black rounded-xl text-gray-500 uppercase">Pick up</button>
          </div>

          {/* Order Items List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
             <div className="flex gap-3 items-center bg-white/40 p-3 rounded-[24px]">
                <img src="https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=100" className="w-12 h-12 rounded-xl object-cover" alt="Latte" />
                <div className="flex-1">
                  <p className="font-black text-[#2D2825] text-xs">Cappuchino</p>
                  <p className="text-[9px] text-gray-500 font-bold uppercase">Size: L | Qty: 2</p>
                </div>
                <p className="font-black text-xs text-dash-accent">Rp 44k</p>
             </div>
          </div>

          {/* Checkout Area */}
          <div className="mt-6 pt-6 border-t-2 border-dashed border-black/10 space-y-3">
            <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="text-[#2D2825]">Rp 44.000</span>
            </div>
            <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
              <span>Diskon Member</span>
              <span className="text-green-600">- Rp 4.400</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-black text-[#2D2825] uppercase text-xs">Total</span>
              <span className="font-black text-2xl text-[#2D2825] font-Poppins">Rp 39.600</span>
            </div>

            <button className="w-full bg-[#2D2825] text-white py-4 rounded-[24px] font-black shadow-lg hover:brightness-125 transition-all mt-4 uppercase text-[10px] tracking-widest">
              Konfirmasi Pesanan
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}