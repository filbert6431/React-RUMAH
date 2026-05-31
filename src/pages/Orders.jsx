import orders from "../Data/Orders.json";
import { FaSearch, FaFilter, FaCoffee, FaHistory } from "react-icons/fa";
import { useState } from "react";
import OrdersTable from "../components/OrdersTable";

export default function Orders() {
  const [dataForm, setDataForm] = useState({
    searchTerm: '',
    selectedItem: '',
  });

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const _selectedItem = dataForm.selectedItem.toLowerCase();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  // Mengambil daftar unik nama menu dari semua order
  const allItems = [...new Set(orders.flatMap((order) => order.items.map(item => item.name)))];

  const filteredOrders = orders.filter((order) => {
    // DISESUAIKAN: Menggunakan order.customer (sesuai JSON terbaru) atau order.nama_lengkap
    const customerName = order.customer_id;
    const orderId = order.id || order.order_id || "";

    const matchesSearch =
      customerName.toLowerCase().includes(_searchTerm) ||
      order.status.toLowerCase().includes(_searchTerm) ||
      orderId.toString().includes(_searchTerm);

    const matchesItem = _selectedItem
      ? order.items.some((item) => item.name.toLowerCase().includes(_selectedItem))
      : true;

    return matchesSearch && matchesItem;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Halaman */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-dash-accent/10 rounded-lg">
              <FaHistory className="text-dash-accent" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Riwayat Pesanan</h1>
          </div>
          <p className="text-white/40 text-sm font-medium">Pantau dan kelola seluruh alur transaksi Doge Coffee.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 focus-within:ring-2 focus-within:ring-dash-accent/50 transition-all shadow-2xl">
            <FaSearch className="text-white/20 mr-3" />
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari ID atau Nama..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/20 w-48 md:w-64"
              value={dataForm.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <select
              name="selectedItem"
              value={dataForm.selectedItem}
              onChange={handleChange}
              className="appearance-none bg-black/40 border border-white/5 text-white/70 rounded-2xl py-3.5 pl-6 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-dash-accent/50 transition-all cursor-pointer shadow-2xl"
            >
              <option value="">Semua Menu</option>
              {allItems.map((item, index) => (
                <option key={index} value={item} className="bg-[#2D2825]">{item}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
              <FaFilter size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Utama */}
      <OrdersTable filteredOrders={filteredOrders} />

      {/* Summary Footer */}
      <div className="flex justify-end pt-4">

        {/* Footer Summary */}
        <div className="mt-8 flex justify-between items-center px-4">
          <p className="text-[#8E837C] text-xs font-bold uppercase tracking-[0.2em]">
            Showing <span className="text-white">{filteredOrders.length}</span> of {orders.length} Total Orders
          </p>

          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full ${filteredOrders.length > 0 ? 'bg-dash-accent animate-pulse' : 'bg-white/10'}`}></div>
            <div className="w-2 h-2 rounded-full bg-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-white/10"></div>
          </div>
        </div>


          {/* Footer summary dengan total revenue dari orders yang sudah difilter */}
        <div className="bg-dash-accent text-[#1A1614] rounded-[32px] px-10 py-6 shadow-2xl flex items-center gap-8 transform hover:scale-[1.02] transition-transform">
          <div className="bg-black/10 p-4 rounded-2xl">
            <FaCoffee className="text-2xl" />
          </div>
          <div>
            <p className="text-[#1A1614]/60 text-[10px] font-black uppercase tracking-widest">Total Revenue (Filtered)</p>
            <p className="text-4xl font-black tracking-tighter">
              Rp {filteredOrders.reduce((acc, curr) => acc + (curr.total || 0), 0).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}