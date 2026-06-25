import { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaCrown } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { customerAPI } from "../../Services/customer";
import CustomerTable from "../../components/Admin/CustomerTable";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedKelamin: "",
    name: "",
    Email: "",
    Username: "",
    Nomor_HP: "",
    Jenis_Kelamin: "",
    level_membership: "Bronze",
    status_member: "Aktif",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const resetForm = () => {
    setDataForm({
      searchTerm: "",
      selectedKelamin: "",
      name: "",
      Email: "",
      Username: "",
      Nomor_HP: "",
      Jenis_Kelamin: "",
      level_membership: "Bronze",
      status_member: "Aktif",
    });
  };

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await customerAPI.fetchCustomers();
      setCustomers(data || []);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data customer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        name: dataForm.name,
        Email: dataForm.Email,
        Username: dataForm.Username,
        Nomor_HP: dataForm.Nomor_HP,
        Jenis_Kelamin: dataForm.Jenis_Kelamin,
        level_membership: dataForm.level_membership,
        status_member: dataForm.status_member,
      };

      await customerAPI.createCustomer(payload);
      setSuccess("Customer berhasil ditambahkan!");
      resetForm();
      loadCustomers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus customer ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await customerAPI.deleteCustomer(id);
      setSuccess("Customer berhasil dihapus.");
      loadCustomers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const _searchTerm = (dataForm.searchTerm || "").toLowerCase();

  // Memfilter langsung dari state `customers` bawaan backend
  const filteredMembers = customers.filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(_searchTerm) ||
      (item.Username || "").toLowerCase().includes(_searchTerm) ||
      (item.Email || "").toLowerCase().includes(_searchTerm) ||
      (item.Nomor_HP || "").toLowerCase().includes(_searchTerm) ||
      String(item.customer_id || "").toLowerCase().includes(_searchTerm);

    const matchesKelamin = dataForm.selectedKelamin
      ? item.Jenis_Kelamin === dataForm.selectedKelamin
      : true;

    return matchesSearch && matchesKelamin;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">
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
              placeholder="Cari Customer ID, nama, username, email..."
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
        </div>
      </div>

      <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/5 p-8">
        {error && <div className="mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-100 px-5 py-4">{error}</div>}
        {success && <div className="mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 px-5 py-4">{success}</div>}

        <h2 className="text-2xl font-black text-white mb-6">Tambah Customer Baru</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            name="name"
            value={dataForm.name}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            required
            disabled={loading}
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder-white/40"
          />
          <input
            name="Email"
            type="email"
            value={dataForm.Email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={loading}
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder-white/40"
          />
          <input
            name="Username"
            value={dataForm.Username}
            onChange={handleChange}
            placeholder="Username"
            required
            disabled={loading}
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder-white/40"
          />
          <input
            name="Nomor_HP"
            value={dataForm.Nomor_HP}
            onChange={handleChange}
            placeholder="Nomor HP"
            required
            disabled={loading}
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder-white/40"
          />
          <select
            name="Jenis_Kelamin"
            value={dataForm.Jenis_Kelamin}
            onChange={handleChange}
            required
            disabled={loading}
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder-white/40"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="col-span-full rounded-3xl bg-dash-accent px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#1A1614] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Mohon tunggu..." : "Tambah Customer"}
          </button>
        </form>
      </div>

      <CustomerTable
        customers={filteredMembers}
        onDelete={handleDelete}
        loading={loading}
      />

      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-[#8E837C] text-xs font-bold uppercase tracking-[0.2em]">
          Showing <span className="text-white">{filteredMembers.length}</span> customers
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