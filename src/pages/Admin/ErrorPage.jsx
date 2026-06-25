import { FaLock, FaUserShield, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ code = "404" }) {
  const navigate = useNavigate();

  // Mapping konten berdasarkan kode error
  const errorContent = {
    "401": {
      title: "Unauthorized",
      desc: "Protokol keamanan mendeteksi sesi Anda telah berakhir atau tidak valid. Silakan login kembali.",
      icon: <FaLock className="text-red-500" />,
      color: "from-red-500/20",
    },
    "403": {
      title: "Forbidden",
      desc: "Akses Ditolak. Anda tidak memiliki izin tingkat tinggi untuk memasuki area Brewmaster ini.",
      icon: <FaUserShield className="text-amber-500" />,
      color: "from-amber-500/20",
    },
    "404": {
      title: "Not Found",
      desc: "Halaman yang Anda cari telah menguap seperti uap espresso. Mari kembali ke jalur yang benar.",
      icon: <FaExclamationTriangle className="text-dash-accent" />,
      color: "from-dash-accent/20",
    }
  };

  const content = errorContent[code] || errorContent["404"];

  return (
    <div className="min-h-screen bg-[#1A1614] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${content.color} to-transparent rounded-full blur-[120px] opacity-50`}></div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Icon Besar */}
        <div className="mb-10 inline-flex items-center justify-center w-32 h-32 bg-white/5 border border-white/10 rounded-[40px] text-6xl shadow-2xl backdrop-blur-md animate-bounce-slow">
          {content.icon}
        </div>

        {/* Text Area */}
        <div className="space-y-4">
          <h1 className="text-[120px] font-black text-white/10 leading-none tracking-tighter absolute -top-16 left-1/2 -translate-x-1/2 select-none">
            {code}
          </h1>
          <h2 className="text-5xl font-black text-white tracking-tight relative">
            {content.title}
          </h2>
          <p className="text-gray-500 text-xl font-medium max-w-md mx-auto leading-relaxed">
            {content.desc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-2xl transition-all active:scale-95 uppercase text-sm tracking-widest"
          >
            <FaArrowLeft /> Kembali
          </button>
          
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 bg-dash-accent text-black font-black rounded-2xl shadow-xl hover:brightness-110 transition-all active:scale-95 uppercase text-sm tracking-widest"
          >
            Masuk ke Portal
          </button>
        </div>

        {/* Footer Branding */}
        <div className="mt-20 opacity-20">
            <p className="text-xs font-black uppercase tracking-[0.5em] text-white">Doge Coffee Security Protocol</p>
        </div>
      </div>
    </div>
  );
}