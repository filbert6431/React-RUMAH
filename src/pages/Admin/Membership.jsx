import customersData from "../../Data/Customers.json";
import { FaUserPlus, FaGem, FaMedal, FaSearch, FaFilter, FaCrown, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom"; // Pastikan sudah install react-router-dom
import MembershipTable from "../../components/Admin/MembershipTable";

export default function Membership() {
  const [dataForm, setDataForm] = useState({
    searchTerm: '',
    selectedLevel: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  // Map customers data into membership-shaped objects expected by MembershipTable
  const mapped = customersData.map((c) => ({
    id: c.ID_Customer ? Number(String(c.ID_Customer).replace(/\D/g, "")) : undefined,
    customer_id: c.ID_Customer,
    name: c.Nama_Lengkap || c.name || "-",
    tanggal_daftar: c.tanggal_daftar || c.joinDate,
    level_membership: c.level_membership || c.level || c.membershipLevel,
    points: c.points ?? 0,
  }));

  const filteredMembers = mapped.filter((member) => {
    const matchesSearch =
      (member.name || "").toLowerCase().includes(_searchTerm) ||
      (member.customer_id || "").toString().toLowerCase().includes(_searchTerm);

    const matchesLevel = dataForm.selectedLevel
      ? (member.level_membership || member.level) === dataForm.selectedLevel
      : true;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">
      
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
          <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-5 py-3 shadow-2xl focus-within:ring-2 focus-within:ring-dash-accent/50 transition-all">
            <FaSearch className="text-white/20 mr-3" />
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari Member ID..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/20 w-48 md:w-60"
              value={dataForm.searchTerm}
              onChange={handleChange}
            />
          </div>

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

      <MembershipTable filteredMembers={filteredMembers} />
      
      {/* Footer Summary */}
      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-[#8E837C] text-xs font-bold uppercase tracking-[0.2em]">
          Showing <span className="text-white">{filteredMembers.length}</span> of {customersData.length} Total Customers
        </p>
        
        <div className="flex gap-2">
           <div className={`w-2 h-2 rounded-full ${filteredMembers.length > 0 ? 'bg-dash-accent animate-pulse' : 'bg-white/10'}`}></div>
           <div className="w-2 h-2 rounded-full bg-white/10"></div>
           <div className="w-2 h-2 rounded-full bg-white/10"></div>
        </div>
      </div>
    </div>
  );
}