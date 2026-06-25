import { useState } from "react";
import { Button } from "../ui/button";

export default function StaffTable({ filteredStaff, onEdit, onDelete }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 25;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentData = filteredStaff.slice(start, end);

    return (
        <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[10px] font-black tracking-[0.2em]">
                        <tr>
                            <th className="p-8">Foto</th>
                            <th className="p-8 text-center">ID</th>
                            <th className="p-8">Nama Staf</th>
                            <th className="p-8 text-center">Role</th>
                            <th className="p-8 text-center">Gender</th>
                            <th className="p-8">Telepon</th>
                            <th className="p-8 text-center">Status</th>
                            <th className="p-8 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#E5D9D0]">
                        {currentData.length > 0 ? (
                            currentData.map((staff) => {
                                const statusClass =
                                    staff.status === "Aktif"
                                        ? "bg-green-500/10 text-green-300 border-green-500/20"
                                        : staff.status === "Cuti"
                                            ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                                            : "bg-red-500/10 text-red-300 border-red-500/20";

                                return (
                                    <tr key={staff.staff_id} className="border-t border-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group">
                                        <td className="p-8">
                                            <img
                                                src={staff.foto_url}
                                                alt={staff.nama_lengkap}
                                                className="w-20 h-16 object-cover rounded-3xl border border-white/10 shadow-inner"
                                            />
                                        </td>
                                        <td className="p-8 text-center">
                                            <span className="bg-[#141110] text-dash-accent border border-dash-accent/20 px-4 py-2 rounded-xl text-xs font-black group-hover:border-dash-accent/60 transition-all">
                                                {staff.staff_id}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-[18px] bg-[#1E1A18] border border-white/10 flex items-center justify-center text-dash-accent text-lg font-black shadow-inner group-hover:border-dash-accent/50 transition-all">
                                                    {staff.nama_lengkap?.charAt(0) || "?"}
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-white group-hover:text-dash-accent transition-colors leading-none">
                                                        {staff.nama_lengkap}
                                                    </p>
                                                    <p className="text-[10px] text-white/20 uppercase font-bold tracking-[0.15em] mt-1.5">
                                                        {staff.no_telp}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8 text-center">
                                            <span className={`inline-flex items-center justify-center px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg border ${statusClass}`}>
                                                {staff.role}
                                            </span>
                                        </td>
                                        <td className="p-8 text-center">
                                            <span className="text-sm font-black text-white/80">{staff.gender}</span>
                                        </td>
                                        <td className="p-8">
                                            <p className="text-sm font-black text-white">{staff.no_telp}</p>
                                        </td>
                                        <td className="p-8 text-center">
                                            <span className={`inline-flex items-center justify-center px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border shadow-lg ${statusClass}`}>
                                                {staff.status}
                                            </span>
                                        </td>
                                        <td className="p-8 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => onEdit?.(staff)}
                                                    className="px-4 py-2 rounded-2xl bg-dash-accent text-black font-bold text-xs uppercase tracking-[0.18em] transition hover:bg-dash-accent/90"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onDelete?.(staff.staff_id)}
                                                    className="px-4 py-2 rounded-2xl bg-red-500 text-white font-bold text-xs uppercase tracking-[0.18em] transition hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-32 text-center text-white/10">
                                    <div className="flex flex-col items-center gap-4">
                                        <p className="text-xl font-black italic tracking-widest uppercase">Staff tidak ditemukan</p>
                                        <p className="text-sm">Coba ubah kata kunci atau filter role.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex gap-2 mt-4 justify-center items-center">
                    <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                        Previous
                    </Button>
                    <span>Page {page}</span>
                    <Button disabled={end >= filteredStaff.length} onClick={() => setPage(page + 1)}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
