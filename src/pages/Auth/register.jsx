import { FaCoffee, FaLock, FaEnvelope, FaUser, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-8">
      {/* Container Ultra-Wide 1400px */}
      <div className="max-w-[1200px] w-full min-h-[550px] bg-[#2D2825] rounded-[60px] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.7)] flex flex-col md:flex-row-reverse border border-white/5 transition-all duration-500">
        
        {/* SISI KANAN: Visual Branding (Reverse dari Login agar variatif) */}
        <div className="md:w-[45%] bg-[#8B5E52] p-20 lg:p-28 flex flex-col justify-between relative overflow-hidden">
          {/* Ornamen Visual - Efek Glow hangat kecokelatan */}
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[130px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-black/30 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 text-right">
            <div className="flex items-center gap-6 mb-16 justify-end">
              <div>
                <span className="text-white font-black text-4xl tracking-tighter block leading-none text-right">DOGE</span>
                <span className="text-white/60 font-bold text-lg tracking-[0.3em] uppercase">Coffee Co.</span>
              </div>
              <div className="bg-white p-6 rounded-[32px] shadow-2xl transform rotate-12 border-b-4 border-gray-200">
                <FaCoffee className="text-[#8B5E52] text-5xl" />
              </div>
            </div>
            
            <h1 className="text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-10 tracking-tighter">
              Join the <br /> Heritage <br /> <span className="text-black/10 italic">Network.</span>
            </h1>
            
            <div className="h-1.5 w-32 bg-white/30 rounded-full mb-10 ml-auto"></div>
            
            <p className="text-white/80 text-xl lg:text-2xl font-medium leading-relaxed max-w-lg ml-auto">
              Daftarkan diri Anda sebagai personel admin dan mulai kelola ekosistem kopi terbaik di kelasnya.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 justify-end">
            <p className="text-white/40 text-sm font-black uppercase tracking-[0.5em]">Administrator Registry</p>
            <FaShieldAlt className="text-white/20 text-2xl" />
          </div>
        </div>

        {/* SISI KIRI: Form Register (Sangat Lega) */}
        <div className="md:w-[50%] bg-[#2D2825] p-20 lg:p-32 flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Create Account</h2>
            <p className="text-gray-500 text-xl font-medium">Lengkapi protokol data untuk akses dashboard.</p>
          </div>
          
          <form className="space-y-8">
            {/* Input Full Name */}
            <div className="space-y-4">
              <label className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Full Name</label>
              <div className="relative flex items-center group">
                <FaUser className="absolute left-7 text-gray-600 group-focus-within:text-dash-accent transition-colors text-xl" />
                <input 
                  type="text" 
                  placeholder="Nama Lengkap Anda"
                  className="w-full bg-black/40 border-2 border-white/5 rounded-[32px] py-7 pl-16 pr-8 text-lg text-white outline-none focus:ring-8 focus:ring-dash-accent/10 focus:border-dash-accent/50 transition-all duration-500 placeholder:text-gray-800"
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-4">
              <label className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Work Email</label>
              <div className="relative flex items-center group">
                <FaEnvelope className="absolute left-7 text-gray-600 group-focus-within:text-dash-accent transition-colors text-xl" />
                <input 
                  type="email" 
                  placeholder="nama@dogecoffee.corp"
                  className="w-full bg-black/40 border-2 border-white/5 rounded-[32px] py-7 pl-16 pr-8 text-lg text-white outline-none focus:ring-8 focus:ring-dash-accent/10 focus:border-dash-accent/50 transition-all duration-500 placeholder:text-gray-800"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-4">
              <label className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Secure Password</label>
              <div className="relative flex items-center group">
                <FaLock className="absolute left-7 text-gray-600 group-focus-within:text-dash-accent transition-colors text-xl" />
                <input 
                  type="password" 
                  placeholder="Min. 8 Karakter Kombinasi"
                  className="w-full bg-black/40 border-2 border-white/5 rounded-[32px] py-7 pl-16 pr-8 text-lg text-white outline-none focus:ring-8 focus:ring-dash-accent/10 focus:border-dash-accent/50 transition-all duration-500 placeholder:text-gray-800"
                />
              </div>
            </div>

            <div className="px-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                Dengan mendaftar, Anda menyetujui <span className="text-white underline cursor-pointer">Syarat & Ketentuan</span> protokol manajemen Doge Coffee Co.
              </p>
            </div>

            {/* Submit Button */}
            <button className="group w-full bg-dash-accent text-white py-8 rounded-[32px] font-black shadow-[0_25px_50px_-12px_rgba(234,179,8,0.4)] hover:shadow-dash-accent/60 hover:translate-y-[-4px] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-4">
              <span className="uppercase text-lg tracking-[0.3em]">Register Personel</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-gray-500 font-medium text-lg">
              Sudah memiliki akses terdaftar?
            </p>
            <Link to="/login" className="group flex items-center gap-2 text-white font-black uppercase tracking-[0.2em] hover:text-dash-accent transition-colors">
              Masuk ke Portal <div className="w-8 h-1 bg-dash-accent group-hover:w-12 transition-all"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}