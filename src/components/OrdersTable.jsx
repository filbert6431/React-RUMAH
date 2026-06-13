import { FaCoffee, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { formatRupiah, getOrderTotal } from "../lib/orderUtils";

export default function OrdersTable({ filteredOrders, onEdit, onDelete }) {

  // pagination
  const [page, setPage] = useState(1)

  const itemsPerPage = 25

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const currentData = filteredOrders.slice(start, end)
  const safeOrders = currentData.map((order) => ({
    ...order,
    _id: order.id ?? order.order_id,
    items: Array.isArray(order.items) ? order.items : [],
    calculatedTotal: getOrderTotal(order.items || []),
  }))

  return (
    <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[10px] font-black tracking-[0.2em]">
            <tr>
              <th className="p-8 text-center">ID</th>
              <th className="p-8">Pelanggan</th>
              <th className="p-8">Menu Pesanan</th>
              <th className="p-8 text-center">Status</th>
              <th className="p-8 text-right">Revenue</th>
              <th className="p-8 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-[#E5D9D0]">
            {safeOrders.length > 0 ? (
              safeOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-white/2 hover:bg-white/4 transition-all duration-300 group"
                >
                  {/* Kolom ID */}
                  <td className="p-8 text-center">
                    <span className="bg-[#141110] text-dash-accent border border-dash-accent/20 px-4 py-2 rounded-xl text-xs font-black group-hover:border-dash-accent/60 group-hover:shadow-[0_0_15px_rgba(212,181,160,0.1)] transition-all">
                      #{order.order_id ?? order._id}
                    </span>
                  </td>

                  {/* Kolom Pelanggan */}
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block">
                        <FaUserCircle className="text-white/10 text-3xl group-hover:text-dash-accent/40 transition-colors" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-white group-hover:text-dash-accent transition-colors leading-none">
                          {order.customer_id}
                        </p>
                        <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.15em] mt-1.5 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-dash-accent rounded-full animate-pulse"></span>
                          Verified Member
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Kolom Menu (Items) */}
                  <td className="p-8">
                    <div className="flex flex-wrap gap-2 max-w-[300px]">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-black/40 border border-white/5 px-3 py-1.5 rounded-xl group-hover:border-white/10 transition-colors"
                        >
                          <FaCoffee className="text-[10px] text-dash-accent/50" />
                          <span className="text-xs font-bold text-white/80">
                            <span className="text-dash-accent">{item.qty}x</span> {item.name}
                          </span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="bg-white/5 border border-dashed border-white/10 px-3 py-1.5 rounded-xl self-center">
                          <span className="text-[10px] text-white/40 font-black">
                            +{order.items.length - 2} OTHERS
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Kolom Status */}
                  <td className="p-8 text-center">
                    <span className={`inline-block px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border shadow-lg transition-all duration-300 ${order.status === "Delivered"
                        ? "bg-green-500/10 text-green-400 border-green-500/20 group-hover:bg-green-500/20"
                        : order.status === "Pending" || order.status === "Processing"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:bg-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20"
                      }`}>
                      {order.status}
                    </span>
                  </td>

                  {/* Kolom Revenue */}
                  <td className="p-8 text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-black text-xl text-white tracking-tight group-hover:scale-105 transition-transform">
                        {formatRupiah(order.calculatedTotal)}
                      </span>
                      <span className="text-[9px] text-white/10 font-bold uppercase tracking-tighter">Gross Amount</span>
                    </div>
                  </td>

                  {/* Kolom Aksi */}
                  <td className="p-8 text-center">
                    <div className="flex flex-col gap-2 items-center">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(order)}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-dash-accent text-black font-black text-[10px] uppercase tracking-[0.2em] transition hover:bg-dash-accent/90"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onDelete?.(order._id)}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-red-500 text-white font-black text-[10px] uppercase tracking-[0.2em] transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-32 text-center">
                  <div className="flex flex-col items-center justify-center opacity-20">
                    <FaCoffee size={48} className="mb-4" />
                    <p className="text-xl font-black italic tracking-widest uppercase">No Orders Found</p>
                    <p className="text-xs mt-2 font-medium uppercase tracking-[0.3em]">Coba ubah filter atau pencarian Anda</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4 justify-center items-center">
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>

          <span>Page {page}</span>

          <Button
            disabled={end >= filteredOrders.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
