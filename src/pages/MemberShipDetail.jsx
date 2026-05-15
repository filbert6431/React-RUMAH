import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// 1. Import data lokal kamu
import members from "../Data/Members.json";

export default function MemberShipDetail() {
  // 2. Ambil ID dari URL (misal: /membership/1)
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 3. State untuk menyimpan data member yang ditemukan
  const [member, setMember] = useState(null);

  useEffect(() => {
    // 4. Cari member di dalam array berdasarkan ID
    const foundMember = members.find((m) => m.id.toString() === id);
    setMember(foundMember);
  }, [id]);

  // 5. Loading/Error handling jika data tidak ada
  if (!member) return <div className="text-white p-10">Data member tidak ditemukan...</div>;

  return (
    <div className="p-8 text-white space-y-6">
      
      {/* BAGIAN TOMBOL KEMBALI */}
      <button 
        onClick={() => navigate(-1)} 
        className="bg-white/10 px-4 py-2 rounded-lg hover:bg-dash-accent hover:text-black transition-all"
      >
        ← Kembali   
      </button>

      {/* HEADER: INFO UTAMA */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-4xl font-bold">{member.name}</h1>
        <p className="text-dash-accent font-mono uppercase tracking-widest">
          ID Member: #{member.id}
        </p>
      </div>

      {/* BODY: RINCIAN DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Box 1: Level & Poin */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-white/40 text-xs uppercase mb-2">Status Loyalitas</h3>
          <p className="text-2xl font-black">{member.level}</p>
          <div className="mt-4">
            <p className="text-xs text-white/40">Total Poin Saat Ini</p>
            <p className="text-3xl font-black text-dash-accent">{member.points.toLocaleString()} PTS</p>
          </div>
        </div>

        {/* Box 2: Info Tambahan */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-white/40 text-xs uppercase mb-2">Informasi Akun</h3>
          <p className="text-lg font-medium">Bergabung Sejak:</p>
          <p className="text-white/60">{member.joinDate}</p>
          
          <div className="mt-4">
            <p className="text-lg font-medium">Status Akun:</p>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
              Aktif
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}