import { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaHistory, FaCoffee } from "react-icons/fa";
import OrdersTable from "../components/OrdersTable";
import { ordersAPI } from "../Services/Orders";
import { getOrderTotal } from "../lib/orderUtils";

const initialFilterState = {
  searchTerm: "",
  selectedItem: "",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState(initialFilterState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await ordersAPI.fetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || "Gagal memuat data pesanan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus pesanan ini?")) return;
    setLoading(true);
    setError("");

    try {
      await ordersAPI.deleteOrder(id);
      setSuccess("Pesanan berhasil dihapus.");
      await loadOrders();
    } catch (err) {
      setError(err.message || "Gagal menghapus pesanan.");
    } finally {
      setLoading(false);
    }
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const _selectedItem = dataForm.selectedItem.toLowerCase();

  const allItems = [...new Set(orders.flatMap((order) => Array.isArray(order.items) ? order.items.map((item) => item.name) : []))];

  const filteredOrders = orders.filter((order) => {
    const customerName = String(order.customer_id || "");
    const orderId = String((order.id ?? order.order_id) || "");

    const matchesSearch =
      customerName.toLowerCase().includes(_searchTerm) ||
      String(order.status || "").toLowerCase().includes(_searchTerm) ||
      orderId.toLowerCase().includes(_searchTerm);

    const matchesItem = _selectedItem
      ? Array.isArray(order.items) && order.items.some((item) => String(item.name || "").toLowerCase().includes(_selectedItem))
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

      {error && <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-4 text-red-100">{error}</div>}
      {success && <div className="rounded-3xl bg-green-500/10 border border-green-500/20 p-4 text-green-100">{success}</div>}

      <div className={loading ? "opacity-60 pointer-events-none transition" : "transition"}>
        <OrdersTable
          filteredOrders={filteredOrders}
          onDelete={handleDelete}
        />
      </div>

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
              Rp {filteredOrders.reduce((acc, curr) => acc + getOrderTotal(curr.items || []), 0).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
