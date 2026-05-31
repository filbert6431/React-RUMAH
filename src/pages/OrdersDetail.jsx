import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import orders from "../Data/Orders.json";
import { FaCoffee, FaReceipt, FaUser, FaClock, FaCheckCircle } from "react-icons/fa";
import BackButton from "../components/BackButton";
import OrderHeader from "../components/OrderHeader";
import OrderDetailLayout from "../components/OrderDetailLayout";

export default function OrdersDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Mencari data order berdasarkan ID dari file JSON
    const foundOrder = orders.find((o) => o.id.toString() === id);
    setOrder(foundOrder);
  }, [id]);

  if (!order) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-white/20">
        <p className="text-xl font-bold italic">Pesanan tidak ditemukan...</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-dash-accent underline">Kembali</button>
      </div>
    );
  }

  return (
    <div className="h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Button & Header */}
      <div className="flex items-center gap-6">
        <BackButton onClick={() => navigate(-1)} />
        <OrderHeader orderId={order.id} />
      </div>

      <OrderDetailLayout
        left={
          <div className="space-y-6">
            <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaReceipt className="text-dash-accent" />
                  <span className="font-black text-white uppercase tracking-widest text-sm">Item Terpesan</span>
                </div>
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${
                  order.status === "Delivered" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="p-8">
                <table className="w-full">
                  <thead>
                    <tr className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5">
                      <th className="pb-4 text-left">Menu</th>
                      <th className="pb-4 text-center">Qty</th>
                      <th className="pb-4 text-right">Harga</th>
                      <th className="pb-4 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {order.items.map((item, index) => (
                      <tr key={index} className="border-b border-white/[0.02] group">
                        <td className="py-6 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center text-dash-accent border border-white/5">
                            <FaCoffee size={20} />
                          </div>
                          <span className="font-bold text-lg">{item.name}</span>
                        </td>
                        <td className="py-6 text-center font-black text-white/40">{item.qty}x</td>
                        <td className="py-6 text-right font-medium text-white/60">Rp {(order.total / item.qty).toLocaleString()}</td>
                        <td className="py-6 text-right font-black text-xl tracking-tighter">
                          Rp {(order.total).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Footer */}
              <div className="p-8 bg-black/20 flex justify-between items-center">
                 <span className="text-white/40 font-bold uppercase text-xs tracking-widest">Total Bayar</span>
                 <span className="text-4xl font-black text-dash-accent tracking-tighter">
                    Rp {order.total.toLocaleString()}
                 </span>
              </div>
            </div>
          </div>
        }
        right={
          <div className="space-y-6">
            {/* Card Pelanggan */}
            <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <FaUser size={80} />
              </div>
              <h3 className="text-white/20 font-black uppercase text-[10px] tracking-[0.2em] mb-6">Informasi Pelanggan</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-[22px] bg-dash-accent flex items-center justify-center text-black text-2xl font-black">
                  {order.customer.charAt(0)}
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{order.customer}</p>
                  <p className="text-dash-accent/60 text-xs font-bold">Doge Loyal Member</p>
                </div>
              </div>
            </div>

            {/* Card Status & Waktu */}
            <div className="bg-[#1E1A18]/60 backdrop-blur-xl rounded-[40px] p-8 border border-white/5 shadow-2xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                  <FaClock />
                </div>
                <div>
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Waktu Transaksi</p>
                  <p className="text-white font-bold">14 Mei 2024, 10:45 WIB</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                  <FaCheckCircle />
                </div>
                <div>
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Metode Pembayaran</p>
                  <p className="text-white font-bold">E-Wallet (DogePay)</p>
                </div>
              </div>
            </div>

            <button className="w-full py-5 bg-dash-accent rounded-[24px] text-black font-black text-sm uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform shadow-xl">
              Cetak Struk
            </button>
          </div>
        }
      />
    </div>
  );
}