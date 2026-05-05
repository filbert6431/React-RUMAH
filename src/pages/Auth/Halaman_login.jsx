import { FaCoffee, FaLock, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { BsFillExclamationDiamondFill } from "react-icons/bs"; // Tambahkan ini
import { ImSpinner2 } from "react-icons/im"; // Tambahkan ini
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Pastikan axios di-import

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ini penting agar page tidak reload
    setLoading(true);
    setError(""); // Gunakan string kosong untuk reset error

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        // Tangkap pesan error dari server
        const msg = err.response?.data?.message || "Authentication Failed";
        setError(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // UI Error Info
  const errorInfo = error ? (
    <div className="bg-[#E2D9C8] border-red-500/50 mb-8 p-6 text-white rounded-[24px] flex items-center shadow-2xl animate-shake">
      <BsFillExclamationDiamondFill className="text-red-500 me-4 text-2xl shrink-0" />
      <span className="font-bold tracking-tight">{error}</span>
    </div>
  ) : null;

  // UI Loading Info
  const loadingInfo = loading ? (
    <div className="bg-white/10 backdrop-blur-md mb-8 p-6 text-dash-accent rounded-[24px] flex items-center border border-white/10">
      <ImSpinner2 className="me-4 animate-spin text-2xl" />
      <span className="font-black uppercase tracking-widest text-sm">Validating Protocol...</span>
    </div>
  ) : null;

  return (
    <div className="max-w-[1400px] w-full min-h-[800px] bg-[#2D2825] rounded-[60px] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.7)] flex flex-col md:flex-row border border-white/5 transition-all duration-500">

      {/* SISI KIRI: Visual/Branding */}
      <div className="md:w-[50%] bg-dash-accent p-20 lg:p-28 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-black/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-16">
            <div className="bg-white p-6 rounded-[32px] shadow-2xl transform -rotate-12">
              <FaCoffee className="text-dash-accent text-5xl" />
            </div>
            <div>
              <span className="text-white font-black text-4xl tracking-tighter block leading-none">DOGE</span>
              <span className="text-white/60 font-bold text-lg tracking-[0.3em] uppercase">Coffee Co.</span>
            </div>
          </div>

          <h1 className="text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-10 tracking-tighter">
            The <br /> Brewmaster <br /> <span className="text-black/10 italic">Portal.</span>
          </h1>
          <div className="h-1.5 w-32 bg-white/30 rounded-full mb-10"></div>
          <p className="text-white/80 text-xl lg:text-2xl font-medium leading-relaxed max-w-lg">
            Optimalkan operasional kedai Anda dengan sistem manajemen terintegrasi generasi terbaru.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-sm font-black uppercase tracking-[0.5em]">Central Command v2.0</p>
        </div>
      </div>

      {/* SISI KANAN: Form Login */}
      <div className="md:w-[50%] bg-[#2D2825] p-20 lg:p-32 flex flex-col justify-center">
        <div className="mb-12">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Authentication</h2>
          <p className="text-gray-500 text-xl font-medium">Silakan masukkan identitas digital admin Anda.</p>
        </div>

        {/* FEEDBACK AREA */}
        {errorInfo}
        {loadingInfo}

        {/* PERBAIKAN DI SINI: Tambahkan onSubmit */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-4">
            <label className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Digital ID / Email</label>
            <div className="relative flex items-center group">
              <FaEnvelope className="absolute left-7 text-gray-600 group-focus-within:text-dash-accent transition-colors text-xl" />
              <input
                type="text"
                name="email"
                placeholder="admin@dogecoffee.corp"
                className="w-full bg-black/40 border-2 border-white/5 rounded-[32px] py-7 pl-16 pr-8 text-lg text-white outline-none focus:ring-8 focus:ring-dash-accent/10 focus:border-dash-accent/50 transition-all duration-500 placeholder:text-gray-800"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Secret Key</label>
            <div className="relative flex items-center group">
              <FaLock className="absolute left-7 text-gray-600 group-focus-within:text-dash-accent transition-colors text-xl" />
              <input
                type="password"
                name="password"
                placeholder="••••••••••••"
                className="w-full bg-black/40 border-2 border-white/5 rounded-[32px] py-7 pl-16 pr-8 text-lg text-white outline-none focus:ring-8 focus:ring-dash-accent/10 focus:border-dash-accent/50 transition-all duration-500 placeholder:text-gray-800"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="group w-full bg-dash-accent text-white py-8 rounded-[32px] font-black shadow-[0_25px_50px_-12px_rgba(234,179,8,0.4)] hover:shadow-dash-accent/60 hover:translate-y-[-4px] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="uppercase text-lg tracking-[0.3em]">{loading ? "Verifying..." : "Authorize Access"}</span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </form>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-4">
          <p className="text-gray-500 font-medium text-lg">Belum terdaftar dalam protokol?</p>
          <Link to="/register" className="group flex items-center gap-2 text-white font-black uppercase tracking-[0.2em] hover:text-dash-accent transition-colors">
            Buat Akun Baru <div className="w-8 h-1 bg-dash-accent group-hover:w-12 transition-all"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}