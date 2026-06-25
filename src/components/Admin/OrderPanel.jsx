import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const demoItems = [
  {
    cartId: "demo-cappuccino-L",
    name: "Cappuchino",
    size: "L",
    qty: 2,
    price: 22000,
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=100",
  },
];

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function OrderPanel({
  orderNumber = "#8821",
  items,
  totalItems,
  totalPrice,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  isCheckingOut = false,
}) {
  const cartItems = items || demoItems;
  const calculatedTotalItems = totalItems ?? cartItems.reduce((total, item) => total + item.qty, 0);
  const calculatedTotalPrice = totalPrice ?? cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  const hasItems = cartItems.length > 0;

  return (
    <aside className="flex-[1.2] min-w-[280px] bg-[#E5D9D0] rounded-[40px] p-6 flex flex-col shadow-2xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-[#2D2825]">Pesanan</h2>
        <span className="bg-[#2D2825] text-white px-3 py-1 rounded-lg font-bold text-[10px]">{orderNumber}</span>
      </div>


      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
        {!hasItems && (
          <div className="bg-white/35 border border-white/40 rounded-[28px] p-5 text-center">
            <p className="font-black text-[#2D2825] text-sm">Belum ada pesanan</p>
            <p className="text-[10px] text-gray-500 font-bold mt-1">Pilih produk dari menu POS.</p>
          </div>
        )}

        {cartItems.map((item) => (
          <div key={item.cartId} className="bg-white/45 p-3 rounded-[24px]">
            <div className="flex gap-3 items-center">
              {item.image && (
                <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt={item.name} />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-black text-[#2D2825] text-xs truncate">{item.name}</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase">
                  Size: {item.size} | {formatRupiah(item.price)}
                </p>
              </div>
              <p className="font-black text-xs text-dash-accent">
                {formatRupiah(item.price * item.qty)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onDecrease?.(item.cartId)}
                  className="w-8 h-8 rounded-xl bg-white text-[#2D2825] flex items-center justify-center hover:bg-[#2D2825] hover:text-white transition"
                >
                  <FaMinus size={10} />
                </button>
                <span className="w-8 text-center text-sm font-black text-[#2D2825]">{item.qty}</span>
                <button
                  type="button"
                  onClick={() => onIncrease?.(item.cartId)}
                  className="w-8 h-8 rounded-xl bg-white text-[#2D2825] flex items-center justify-center hover:bg-[#2D2825] hover:text-white transition"
                >
                  <FaPlus size={10} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onRemove?.(item.cartId)}
                className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
              >
                <FaTrash size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t-2 border-dashed border-black/10 space-y-3">
        <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
          <span>Total Item</span>
          <span className="text-[#2D2825]">{calculatedTotalItems}</span>
        </div>
        <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
          <span>Subtotal</span>
          <span className="text-[#2D2825]">{formatRupiah(calculatedTotalPrice)}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="font-black text-[#2D2825] uppercase text-xs">Total</span>
          <span className="font-black text-2xl text-[#2D2825] font-Poppins">{formatRupiah(calculatedTotalPrice)}</span>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          disabled={!hasItems || isCheckingOut}
          className="w-full bg-[#2D2825] disabled:bg-[#2D2825]/40 disabled:cursor-not-allowed text-white py-4 rounded-[24px] font-black shadow-lg hover:brightness-125 transition-all mt-4 uppercase text-[10px] tracking-widest"
        >
          {isCheckingOut ? "Menyimpan..." : "Checkout"}
        </button>
      </div>
    </aside>
  );
}
