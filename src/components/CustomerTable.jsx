import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AiFillDelete } from "react-icons/ai";

export default function CustomerTable({ customers, onDelete, loading = false }) {
  // pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 25;

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = customers.slice(start, end);

  return (
    <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[30px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[11px] font-black tracking-[0.15em] whitespace-nowrap">
            <tr>
              <th className="w-1 px-6 py-4 text-center">ID</th>
              <th className="px-6 py-4">Nama Customer</th>
              <th className="w-1 px-6 py-4 text-center">Rank</th>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Jenis Kelamin</th>
              <th className="w-1 px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-[#E5D9D0] text-sm divide-y divide-white/5">
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <tr 
                  key={item.customer_id} 
                  className="hover:bg-white/[0.02] transition-colors group whitespace-nowrap"
                >
                  {/* ID - Fit Content & Center */}
                  <td className="px-6 py-4 font-mono font-bold text-white text-xs tracking-wider text-center">
                    {item.customer_id}
                  </td>
                  
                  {/* Nama */}
                  <td className="px-6 py-4 font-medium text-white/90">
                    {item.name || "-"}
                  </td>
                  
                  {/* Rank - Badge Fit Content */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-white/10 text-dash-accent border border-dash-accent/20">
                      {item.level_membership || "Bronze"}
                    </span>
                  </td>
                  
                  {/* Username */}
                  <td className="px-6 py-4 text-white/60">
                    @{item.Username || "-"}
                  </td>
                  
                  {/* Jenis Kelamin */}
                  <td className="px-6 py-4 text-white/70">
                    {item.Jenis_Kelamin || "-"}
                  </td>
                  
                  {/* Aksi - Fit Content */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/Customer/${item.customer_id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-dash-accent px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#1A1614] hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-dash-accent/10"
                      >
                        Detail
                      </Link>
                      {onDelete && (
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => onDelete(item.id)}
                          className="inline-flex items-center justify-center rounded-xl bg-red-500/10 p-2 text-red-400 hover:text-white hover:bg-red-500 transition-all disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
                        >
                          <AiFillDelete size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-16 text-center text-white/30 font-medium text-sm">
                  Data customer tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Menu - Dipercantik & Diberi Ruang */}
      <div className="flex justify-between items-center px-8 py-5 bg-[#1E1A18]/30 border-t border-white/5">
        <span className="text-xs text-white/40 font-semibold tracking-wide">
          Page <span className="text-white font-bold">{page}</span> of {Math.ceil(customers.length / itemsPerPage)}
        </span>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold"
          >
            Previous
          </Button>

          <Button
            size="sm"
            disabled={end >= customers.length}
            onClick={() => setPage(page + 1)}
            className="rounded-xl bg-dash-accent text-[#1A1614] hover:brightness-110 text-xs font-bold"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}