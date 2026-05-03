import members from "../data/members.json";
import { FaUserPlus, FaGem, FaMedal, FaSearch, FaFilter, FaCrown } from "react-icons/fa";
import { useState } from "react";

export default function Membership() {
  const [dataForm, setDataForm] = useState({
    searchTerm: '',
    selectedLevel: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  // Logika Filtering
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  
  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(_searchTerm) || 
      member.id.toString().includes(_searchTerm);
    
    const matchesLevel = dataForm.selectedLevel 
      ? member.level === dataForm.selectedLevel 
      : true;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500">
      
      {/* Header Halaman */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <FaCrown className="text-dash-accent text-2xl" />
             <h1 className="text-4xl font-black text-white tracking-tight">Membership Program</h1>
          </div>
          <p className="text-white/40 text-sm font-medium">Kelola database dan loyalitas pelanggan setia Anda.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Box */}
          <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-5 py-3 shadow-2xl focus-within:ring-2 focus-within:ring-dash-accent/50 transition-all">
            <FaSearch className="text-white/20 mr-3" />
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari Member ID atau Nama..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/20 w-48 md:w-60"
              value={dataForm.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Level Filter */}
          <div className="relative">
            <select
              name="selectedLevel"
              value={dataForm.selectedLevel}
              onChange={handleChange}
              className="appearance-none bg-black/40 border border-white/5 text-white/70 rounded-2xl py-3 pl-6 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-dash-accent/50 transition-all cursor-pointer shadow-2xl"
            >
              <option value="">Semua Tier</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
            </select>
            <FaFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={12} />
          </div>

          <button className="bg-dash-accent text-[#1A1614] px-8 py-3.5 rounded-2xl font-black text-sm shadow-[0_15px_30px_-5px_rgba(234,179,8,0.3)] hover:brightness-110 transition-all flex items-center gap-2 active:scale-95">
            <FaUserPlus /> Add New Member
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[10px] font-black tracking-[0.2em]">
              <tr>
                <th className="p-8">Member ID</th>
                <th className="p-8">Customer Info</th>
                <th className="p-8 text-center">Tier Level</th>
                <th className="p-8 text-center">Loyalty Points</th>
                <th className="p-8 text-right">Join Date</th>
              </tr>
            </thead>

            <tbody className="text-[#E5D9D0]">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="border-t border-white/[0.02] hover:bg-white/[0.02] transition-all group">
                    
                    <td className="p-8">
                      <span className="text-dash-accent font-black tracking-tighter text-lg">
                        #{member.id.toString().padStart(3, '0')}
                      </span>
                    </td>

                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-[22px] bg-[#1E1A18] border border-white/10 flex items-center justify-center text-dash-accent text-xl font-black shadow-inner group-hover:border-dash-accent/50 transition-colors">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                           <p className="text-xl font-black text-white group-hover:text-dash-accent transition-colors">{member.name}</p>
                           <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mt-0.5">Verified Member</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-8 text-center">
                      <span
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg border ${
                          member.level === "Platinum"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : member.level === "Gold"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-slate-400/10 text-slate-400 border-slate-400/20"
                        }`}
                      >
                        {member.level === "Platinum" ? <FaGem size={12} /> : <FaMedal size={12} />}
                        {member.level}
                      </span>
                    </td>

                    <td className="p-8 text-center">
                      <div className="inline-flex items-end gap-1.5 bg-black/20 px-5 py-3 rounded-2xl border border-white/5">
                         <span className="font-black text-2xl text-white tracking-tighter leading-none">
                           {member.points.toLocaleString()}
                         </span>
                         <span className="text-[10px] text-dash-accent font-black mb-0.5">PTS</span>
                      </div>
                    </td>
                    
                    <td className="p-8 text-right">
                       <div className="flex flex-col items-end">
                          <span className="text-[10px] text-white/20 font-black uppercase mb-1 tracking-tighter">Member Since</span>
                          <span className="text-sm font-bold text-[#8E837C] bg-black/10 px-4 py-1.5 rounded-xl border border-white/5">
                            {new Date(member.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                       </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="5" className="p-24 text-center text-white/20 font-black italic tracking-widest">
                      TIDAK ADA MEMBER DITEMUKAN
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Summary */}
      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-[#8E837C] text-xs font-bold uppercase tracking-[0.2em]">
          Showing <span className="text-white">{filteredMembers.length}</span> of {members.length} Total Customers
        </p>
        
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-slate-400/50"></div>
           <div className="w-2 h-2 rounded-full bg-amber-400/50"></div>
           <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
        </div>
      </div>
    </div>
  );
}