import orders from "../data/orders.json";
import { FaSearch, FaFilter, FaCoffee, FaHistory } from "react-icons/fa";
import { useState } from "react";

export default function Orders() {
  const [dataForm, setDataForm] = useState({
    searchTerm: '',
    selectedItem: '',
  });

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const _selectedItem = dataForm.selectedItem.toLowerCase();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Mengambil list unik menu untuk dropdown filter
  const allItems = [...new Set(orders.flatMap((f) => f.items.map(i => i.name)))];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(_searchTerm) ||
      order.status.toLowerCase().includes(_searchTerm) ||
      order.total.toString().toLowerCase().includes(_searchTerm);

    const matchesItem = _selectedItem
      ? order.items.some((item) => item.name.toLowerCase().includes(_selectedItem))
      : true;

    return matchesSearch && matchesItem;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500">
      {/* Header Halaman */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <FaHistory className="text-dash-accent" />
             <h1 className="text-4xl font-black text-white tracking-tight">Riwayat Pesanan</h1>
          </div>
          <p className="text-white/40 text-sm font-medium">Pantau dan kelola seluruh alur transaksi Doge Coffee.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Box */}
          <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 focus-within:ring-2 focus-within:ring-dash-accent/50 transition-all shadow-2xl">
            <FaSearch className="text-white/20 mr-3" />
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari ID, Nama, Status..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/20 w-48 md:w-64"
              value={dataForm.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Select Box Custom Styling */}
          <div className="relative">
             <select
                name="selectedItem"
                value={dataForm.selectedItem}
                onChange={handleChange}
                className="appearance-none bg-black/40 border border-white/5 text-white/70 rounded-2xl py-3.5 pl-6 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-dash-accent/50 transition-all cursor-pointer shadow-2xl"
              >
                <option value="">Semua Menu</option>
                {allItems.map((item, index) => (
                  <option key={index} value={item} className="bg-[#2D2825]">
                    {item}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                 <FaFilter size={12} />
              </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[10px] font-black tracking-[0.2em]">
              <tr>
                <th className="p-8 text-center w-32">ID</th>
                <th className="p-8">Pelanggan</th>
                <th className="p-8">Menu Detail</th>
                <th className="p-8 text-center">Status Transaksi</th>
                <th className="p-8 text-right">Revenue</th>
              </tr>
            </thead>

            <tbody className="text-[#E5D9D0]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-white/[0.02] hover:bg-white/[0.02] transition-all group">
                    <td className="p-8 text-center">
                      <span className="bg-[#141110] text-dash-accent border border-dash-accent/20 px-4 py-2 rounded-xl text-xs font-black group-hover:border-dash-accent/50 transition-colors">
                        #{order.id}
                      </span>
                    </td>
                    
                    <td className="p-8">
                      <p className="text-xl font-black text-white group-hover:text-dash-accent transition-colors">
                        {order.customer}
                      </p>
                      <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mt-1">Personal Order</p>
                    </td>

                    <td className="p-8">
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 bg-black/30 border border-white/5 px-3 py-1.5 rounded-xl">
                            <FaCoffee className="text-dash-accent/60" size={10} />
                            <span className="text-xs font-bold text-white/80">
                               <span className="text-dash-accent">{item.qty}x</span> {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-8 text-center">
                      <span
                        className={`inline-block px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border shadow-lg ${
                          order.status === "Delivered"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : order.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-8 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/20 font-black uppercase mb-1">Total Pay</span>
                        <span className="font-black text-2xl text-white tracking-tight">
                          Rp {order.total.toLocaleString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="5" className="p-20 text-center text-white/20 font-bold italic">
                      Data pesanan tidak ditemukan...
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex justify-end pt-4">
        <div className="bg-dash-accent text-[#1A1614] rounded-[32px] px-10 py-6 shadow-2xl flex items-center gap-8 transform hover:scale-[1.02] transition-transform">
          <div className="bg-black/10 p-4 rounded-2xl">
             <FaCoffee className="text-2xl" />
          </div>
          <div>
            <p className="text-[#1A1614]/60 text-[10px] font-black uppercase tracking-widest">Total Revenue (Filtered)</p>
            <p className="text-4xl font-black tracking-tighter">
              Rp {filteredOrders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}