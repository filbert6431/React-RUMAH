import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import customersData from "../../Data/Customers.json";

const normalizeCustomer = (item) => ({
  ...item,
  ID_Customer: item.ID_Customer || item.customer_id || "-",
  Nama_Lengkap: item.Nama_Lengkap || item.name || "-",
  Username: item.Username || "-",
  Email: item.Email || "-",
  Nomor_HP: item.Nomor_HP || "-",
  Jenis_Kelamin: item.Jenis_Kelamin || "-",
  Foto_Profil: item.Foto_Profil || "",
  level_membership: item.level_membership || item.level || item.membershipLevel || "Bronze",
  points: item.points ?? 0,
  jumlah_transaksi: item.jumlah_transaksi ?? item.transaction_count ?? 0,
  total_transaksi_rp: item.total_transaksi_rp ?? item.total_transactions_rp ?? 0,
  tanggal_daftar: item.tanggal_daftar || item.joinDate || "-",
  status_member: item.status_member || item.membershipStatus || "Tidak Aktif",
});

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("customer");
  const foundCustomer = customersData.find(
    (item) => item.ID_Customer === id || item.customer_id === id
  );
  const customer = foundCustomer ? normalizeCustomer(foundCustomer) : null;

  if (!customer) {
    return (
      <div className="p-10 text-white">
        <BackButton onClick={() => navigate(-1)} />
        <div className="mt-6 text-xl font-black">Customer tidak ditemukan.</div>
      </div>
    );
  }

  const rank = customer?.level_membership || customer?.level || customer?.membershipLevel || "Bronze";
  const points = customer?.points ?? 0;
  const totalTransactions = customer?.jumlah_transaksi ?? customer?.transaction_count ?? 0;
  const totalRp = customer?.total_transaksi_rp ?? customer?.total_transactions_rp ?? 0;
  const joinDate = customer?.tanggal_daftar || customer?.joinDate || "-";
  const memberStatus = customer?.status_member || customer?.membershipStatus || "Tidak Aktif";

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <BackButton onClick={() => navigate("/Customer")} />
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">Detail Customer</h1>
              <p className="text-white/40 text-sm">Informasi lengkap customer dan status membership.</p>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#1E1A18]/50 px-6 py-5 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Rank Saat Ini</p>
            <p className="mt-3 text-3xl font-black text-dash-accent uppercase">{rank}</p>
          </div>
        </div>

        <div>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("customer")}
              className={`px-4 py-2 rounded-2xl font-black ${activeTab === "customer" ? "bg-dash-accent text-black" : "bg-white/5 text-white"}`}
            >
              Customer
            </button>
            <button
              onClick={() => setActiveTab("membership")}
              className={`px-4 py-2 rounded-2xl font-black ${activeTab === "membership" ? "bg-dash-accent text-black" : "bg-white/5 text-white"}`}
            >
              Membership
            </button>
          </div>

          {activeTab === "customer" && (
            <div className="rounded-[40px] border border-white/5 bg-[#2D2825]/60 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <h2 className="text-white/40 text-xs uppercase tracking-[0.3em] mb-6">Data Customer</h2>
              <div className="grid gap-4">
                <div className="rounded-3xl bg-[#1E1A18]/80 p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-[28px] bg-white/5 border border-white/10">
                      <img
                        src={customer.Foto_Profil}
                        alt={customer.Nama_Lengkap}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{customer.Nama_Lengkap}</p>
                      <p className="text-sm text-white/40">{customer.Username}</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Customer ID</p>
                    <p className="mt-3 text-lg font-black text-white">{customer.ID_Customer}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Jenis Kelamin</p>
                    <p className="mt-3 text-lg font-black text-white">{customer.Jenis_Kelamin}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Email</p>
                    <p className="mt-3 text-lg font-black text-white">{customer.Email}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">No. Telepon</p>
                    <p className="mt-3 text-lg font-black text-white">{customer.Nomor_HP}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "membership" && (
            <div className="rounded-[40px] border border-white/5 bg-[#2D2825]/60 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <h2 className="text-white/40 text-xs uppercase tracking-[0.3em] mb-6">Detail Membership</h2>
              <div className="grid gap-4">
                <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Status Member</p>
                  <p className="mt-3 text-lg font-black text-white">{memberStatus}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Poin Tersimpan</p>
                  <p className="mt-3 text-3xl font-black text-dash-accent">{points.toLocaleString()} PTS</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Jumlah Transaksi</p>
                  <p className="mt-3 text-lg font-black text-white">{totalTransactions}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Total Transaksi</p>
                  <p className="mt-3 text-lg font-black text-white">Rp {Number(totalRp).toLocaleString('id-ID')}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#1E1A18]/80 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Bergabung Sejak</p>
                  <p className="mt-3 text-lg font-black text-white">{joinDate}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
