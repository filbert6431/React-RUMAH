import { useEffect, useState } from "react";
import { FaTags } from "react-icons/fa";
import { promoAPI } from "../Services/Promo";

export default function Promo() {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);
  const [dataForm, setDataForm] = useState({
    sumber_user: "",
    campaign_diikuti: "",
    giveaway_participation: false,
    subscription: "",
    status_promo: "Aktif",
  });

  const loadPromo = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await promoAPI.fetchPromo();
      setPromoList(data || []);
    } catch (err) {
      setError(err.message || "Gagal memuat data promo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromo();
  }, []);

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setEditId(null);
    setDataForm({
      sumber_user: "",
      campaign_diikuti: "",
      giveaway_participation: false,
      subscription: "",
      status_promo: "Aktif",
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        sumber_user: dataForm.sumber_user,
        campaign_diikuti: dataForm.campaign_diikuti,
        giveaway_participation: dataForm.giveaway_participation,
        subscription: dataForm.subscription,
        status_promo: dataForm.status_promo,
      };

      if (editId) {
        await promoAPI.updatePromo(editId, payload);
        setSuccess("Promo berhasil diperbarui.");
      } else {
        await promoAPI.createPromo(payload);
        setSuccess("Promo baru berhasil ditambahkan.");
      }

      resetForm();
      await loadPromo();
    } catch (err) {
      setError(err.message || "Gagal menyimpan data promo.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (promo) => {
    setEditId(promo.promo_id);
    setDataForm({
      sumber_user: promo.sumber_user || "",
      campaign_diikuti: promo.campaign_diikuti || "",
      giveaway_participation: promo.giveaway_participation || false,
      subscription: promo.subscription || "",
      status_promo: promo.status_promo || "Aktif",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus promo ini?")) return;
    setLoading(true);
    setError("");
    try {
      await promoAPI.deletePromo(id);
      setSuccess("Promo berhasil dihapus.");
      await loadPromo();
    } catch (err) {
      setError(err.message || "Gagal menghapus promo.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPromo = promoList;

  return (
    <div className="h-full space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-dash-accent/10 rounded-xl">
              <FaTags className="text-dash-accent text-xl" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Promo</h1>
          </div>
          <p className="text-white/40 text-sm font-medium">Kelola kampanye promo, sumber user, dan status kampanye.</p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.8fr]">
        
        {/* Kolom Kiri: Form Input */}
        <div>
          <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[30px] p-6 md:p-8 border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white mb-5 tracking-wide">{editId ? "Edit Promo" : "Tambah Promo Baru"}</h2>
            
            {error && <div className="mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 px-5 py-4 text-sm font-medium text-red-100">{error}</div>}
            {success && <div className="mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-4 text-sm font-medium text-emerald-100">{success}</div>}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-white/50">
                Sumber User
                <input
                  name="sumber_user"
                  value={dataForm.sumber_user}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder-white/30 focus:border-dash-accent/50 transition-all mt-1"
                />
              </label>

              <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-white/50">
                Campaign Diikuti
                <input
                  name="campaign_diikuti"
                  value={dataForm.campaign_diikuti}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder-white/30 focus:border-dash-accent/50 transition-all mt-1"
                />
              </label>

              <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-white/50">
                Subscription
                <input
                  name="subscription"
                  value={dataForm.subscription}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder-white/30 focus:border-dash-accent/50 transition-all mt-1"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2 items-center mt-1">
                <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-white/50">
                  Status Promo
                  <select
                    name="status_promo"
                    value={dataForm.status_promo}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full rounded-2xl border border-white/10 bg-[#2D2825] px-4 py-3 text-sm text-white/70 outline-none focus:border-dash-accent/50 transition-all cursor-pointer mt-1"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </label>

                <label className="inline-flex items-center gap-3 text-sm text-white/70 cursor-pointer pt-5">
                  <input
                    type="checkbox"
                    name="giveaway_participation"
                    checked={dataForm.giveaway_participation}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-5 w-5 rounded border border-white/10 bg-white/5 text-dash-accent focus:ring-0 focus:ring-offset-0 cursor-pointer accent-dash-accent"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">Giveaway Part.</span>
                </label>
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-dash-accent px-6 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-[#1A1614] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-dash-accent/10"
                >
                  {loading ? "Mohon tunggu..." : editId ? "Update Promo" : "Tambah Promo"}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-2xl border border-white/10 px-6 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-white hover:bg-white/5 transition active:scale-[0.99]"
                  >
                    Batal Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Kolom Kanan: Tabel Utama */}
        <div>
          <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[30px] border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500">
            <div className="p-6 md:p-8 pb-3">
              <h2 className="text-2xl font-black text-white tracking-wide">Daftar Promo</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto">
                {/* 1. memperbesar ukuran font & padding header (py-5, text-[11px]) */}
                <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[11px] font-black tracking-[0.15em] whitespace-nowrap">
                  <tr>
                    <th className="w-1 px-5 py-5 text-center">ID</th>
                    <th className="px-5 py-5">Nama Promo</th>
                    <th className="w-1 px-5 py-5 text-center">Disc</th>
                    <th className="w-1 px-5 py-5 text-center">Claims</th>
                    <th className="w-1 px-5 py-5 text-center">Limit</th>
                    <th className="w-1 px-5 py-5 text-center">Status</th>
                    <th className="px-5 py-5">Start Date</th>
                    <th className="px-5 py-5">End Date</th>
                    <th className="w-1 px-5 py-5 text-center">Aksi</th>
                  </tr>
                </thead>

                {/* 2. Mengubah teks isi tabel menjadi text-sm (14px) yang lebih seimbang */}
                <tbody className="text-[#E5D9D0] text-sm divide-y divide-white/5">
                  {filteredPromo.length > 0 ? (
                    filteredPromo.map((promo) => (
                      <tr 
                        key={promo.promo_id} 
                        className="hover:bg-white/[0.02] transition-colors group whitespace-nowrap"
                      >
                        {/* ID - Padding tinggi diperbesar (py-5) */}
                        <td className="px-5 py-5 font-mono font-bold text-white text-center text-xs tracking-wider">
                          {promo.promo_id}
                        </td>
                        
                        {/* Nama Promo */}
                        <td className="px-5 py-5 font-semibold text-white/90">
                          {promo.nama_promo || "-"}
                        </td>
                        
                        {/* Discount */}
                        <td className="px-5 py-5 text-center font-black text-dash-accent text-base">
                          {promo.discount}%
                        </td>
                        
                        {/* Claim Count */}
                        <td className="px-5 py-5 text-center font-medium text-white/70">
                          {promo.claim_count}
                        </td>
                        
                        {/* Claim Limit */}
                        <td className="px-5 py-5 text-center font-medium text-white/50">
                          {promo.claim_limit}
                        </td>
                        
                        {/* Status Badge - Dibuat sedikit lebih tebal */}
                        <td className="px-5 py-5 text-center">
                          <span className={`inline-flex items-center justify-center rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-wider border ${
                            promo.status_promo === "Aktif" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : "bg-white/5 text-white/40 border-white/10"
                          }`}>
                            {promo.status_promo}
                          </span>
                        </td>
                        
                        {/* Start Date */}
                        <td className="px-5 py-5 font-medium text-white/60">
                          {promo.start_date || "-"}
                        </td>
                        
                        {/* End Date */}
                        <td className="px-5 py-5 font-medium text-white/60">
                          {promo.end_date || "-"}
                        </td>
                        
                        {/* Aksi - Tombol disesuaikan ukurannya */}
                        <td className="px-5 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(promo)}
                              className="rounded-xl bg-dash-accent px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#1A1614] hover:brightness-110 transition-all active:scale-95 shadow-md shadow-dash-accent/5"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(promo.promo_id)}
                              className="rounded-xl bg-red-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-white hover:bg-red-500 transition-all active:scale-95"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="py-16 text-center text-white/30 font-bold text-sm">
                        Tidak ada data promo.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}