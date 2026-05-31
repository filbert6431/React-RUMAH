export default function OrderPanel({ orderNumber = '#8821' }) {
  return (
    <aside className="flex-[1.2] bg-[#E5D9D0] rounded-[40px] p-6 flex flex-col shadow-2xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-[#2D2825]">Pesanan</h2>
        <span className="bg-[#2D2825] text-white px-3 py-1 rounded-lg font-bold text-[10px]">{orderNumber}</span>
      </div>

      <div className="flex bg-black/5 p-1.5 rounded-2xl mb-6">
        <button className="flex-1 py-2 text-[10px] font-black rounded-xl text-gray-500 uppercase">Dine in</button>
        <button className="flex-1 py-2 text-[10px] font-black rounded-xl bg-dash-accent text-white shadow-md uppercase">Delivery</button>
        <button className="flex-1 py-2 text-[10px] font-black rounded-xl text-gray-500 uppercase">Pick up</button>
      </div>

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
  );
}
