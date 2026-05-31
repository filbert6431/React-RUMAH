import { FaGem, FaMedal, FaChevronRight, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";


export default function MembershipTable({ filteredMembers }) {


  // pagination
  const [page, setPage] = useState(1)

  const itemsPerPage = 25

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const currentData = filteredMembers.slice(start, end)

  return (
    <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[10px] font-black tracking-[0.2em]">
            <tr>
              <th className="p-8">ID</th>
              <th className="p-8">Customer Info</th>
              <th className="p-8 text-center">Tier Level</th>
              <th className="p-8 text-center">Loyalty Points</th>
              <th className="p-8 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-[#E5D9D0]">
            {currentData.length > 0 ? (
              currentData.map((member) => {
                // PENYESUAIAN: Mengambil level dari 'level_membership' atau fallback ke 'level'
                const tier = member.level_membership || member.level || "Silver";

                return (
                  <tr key={member.id} className="border-t border-white/[0.02] hover:bg-white/[0.02] transition-all group">

                    {/* Kolom ID (CUST0001) */}
                    <td className="p-8">
                      <span className="text-dash-accent font-black tracking-tighter text-lg">
                        #{member.customer_id || member.id.toString().padStart(4, '0')}
                      </span>
                    </td>

                    {/* Kolom Info Customer */}
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[18px] bg-[#1E1A18] border border-white/10 flex items-center justify-center text-dash-accent text-lg font-black shadow-inner group-hover:border-dash-accent/50 transition-all duration-300 transform group-hover:rotate-6">
                          {member.name ? member.name.charAt(0) : "?"}
                        </div>
                        <div>
                          <p className="text-lg font-black text-white group-hover:text-dash-accent transition-colors">
                            {member.name}
                          </p>
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mt-0.5">
                            Member since {new Date(member.tanggal_daftar || member.joinDate).getFullYear() || "2024"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Kolom Tier Level */}
                    <td className="p-8 text-center">
                      <span
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg border transition-all duration-300 ${tier === "Platinum"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500/20"
                          : tier === "Gold"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:bg-amber-500/20"
                            : "bg-slate-400/10 text-slate-400 border-slate-400/20 group-hover:bg-slate-400/20"
                          }`}
                      >
                        {tier === "Platinum" ? <FaGem size={12} className="animate-pulse" /> : <FaMedal size={12} />}
                        {tier}
                      </span>
                    </td>

                    {/* Kolom Points */}
                    <td className="p-8 text-center">
                      <div className="inline-flex items-end gap-1.5 bg-black/20 px-5 py-2.5 rounded-2xl border border-white/5 group-hover:border-dash-accent/20 transition-all">
                        <span className="font-black text-xl text-white tracking-tighter leading-none">
                          {(member.points || 0).toLocaleString()}
                        </span>
                        <span className="text-[9px] text-dash-accent font-black mb-0.5">PTS</span>
                      </div>
                    </td>

                    {/* Kolom Aksi */}
                    <td className="p-8 text-center">
                      <Link
                        to={`/membership/${member.customer_id || member.id}`}
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-dash-accent hover:text-black border border-white/10 px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-widest transition-all group/btn shadow-xl active:scale-95"
                      >
                        PROFILE
                        <FaChevronRight className="group-hover/btn:translate-x-1 transition-transform" size={10} />
                      </Link>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="p-32 text-center text-white/10">
                  <div className="flex flex-col items-center gap-4">
                    <FaUserShield size={40} className="opacity-20" />
                    <p className="font-black italic tracking-[0.3em] uppercase text-sm">Member tidak ditemukan</p>
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
            disabled={end >= filteredMembers.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}