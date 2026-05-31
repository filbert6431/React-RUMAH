import customers from "../data/Customers.json";
import { FaUserPlus, FaSearch, FaFilter, FaCrown } from "react-icons/fa";
import { useState } from "react";
import CustomerTable from "../components/CustomerTable";

export default function Customer() {
  const [dataForm, setDataForm] = useState({
    searchTerm: '',
    selectedKelamin: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredMembers = customers.filter((item) => {
    const matchesSearch =
      item.Nama_Lengkap.toLowerCase().includes(_searchTerm) ||
      item.Username.toLowerCase().includes(_searchTerm) ||
      item.Email.toLowerCase().includes(_searchTerm) ||
      item.Nomor_HP.toLowerCase().includes(_searchTerm) ||
      item.ID_Customer.toLowerCase().includes(_searchTerm);

    const matchesKelamin = dataForm.selectedKelamin
      ? item.Jenis_Kelamin === dataForm.selectedKelamin
      : true;

    return matchesSearch && matchesKelamin;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">

      {/* Header Halaman */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <FaCrown className="text-dash-accent text-2xl" />
            <h1 className="text-4xl font-black text-white tracking-tight">List Customer</h1>
          </div>
          <p className="text-white/40 text-sm font-medium">Customer adalah prioritas kita.</p>
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
              name="selectedKelamin"
              value={dataForm.selectedKelamin}
              onChange={handleChange}
              className="appearance-none bg-black/40 border border-white/5 text-white/70 rounded-2xl py-3 pl-6 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-dash-accent/50 transition-all cursor-pointer shadow-2xl"
            >
              <option value="">Semua Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            <FaFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={12} />
          </div>

          <button className="bg-dash-accent text-[#1A1614] px-8 py-3.5 rounded-2xl font-black text-sm shadow-[0_15px_30px_-5px_rgba(234,179,8,0.3)] hover:brightness-110 transition-all flex items-center gap-2 active:scale-95">
            <FaUserPlus /> Add New Member
          </button>
        </div>
      </div>

      <CustomerTable customers={filteredMembers} />

      {/* Footer Summary */}
      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-[#8E837C] text-xs font-bold uppercase tracking-[0.2em]">
          Showing <span className="text-white">{filteredMembers.length}</span> of {customers.length} Total Customers
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