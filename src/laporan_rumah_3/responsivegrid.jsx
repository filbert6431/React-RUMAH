import { useState } from 'react';
import DataKarakter from './KarakterUser.json';

export default function ResponsiveGrid() {
  const [dataForm, setDataForm] = useState({
    searchTerm: '',
    selectedtrait: '',
    selectedkelebihan: '',
    selectedkelemahan: '',
  });

  // Handler fungsi untuk update state
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Ambil list unik untuk dropdown (pastikan nama properti di JSON sesuai: trait, Kelebihan, Kelemahan)
  const alltrait = [...new Set(DataKarakter.flatMap((f) => f.trait || []))];
  const allkelebihan = [...new Set(DataKarakter.flatMap((f) => f.Kelebihan || []))];
  const allkelemahan = [...new Set(DataKarakter.flatMap((f) => f.Kelemahan || []))];

  // LOGIKA FILTER
  const filteredCharacters = DataKarakter.filter((char) => {
    const s = dataForm.searchTerm.toLowerCase();
    
    // 1. Filter Search (Nama, Ras, Kelas)
    const matchesSearch = 
      char.nama.toLowerCase().includes(s) ||
      char.ras.toLowerCase().includes(s) ||
      char.kelas.toLowerCase().includes(s);

    // 2. Filter Dropdown (Menggunakan value langsung dari dataForm)
    const matchestrait = dataForm.selectedtrait 
      ? char.trait?.includes(dataForm.selectedtrait) 
      : true;

    const matcheskelebihan = dataForm.selectedkelebihan 
      ? char.Kelebihan?.includes(dataForm.selectedkelebihan) 
      : true;

    const matcheskelemahan = dataForm.selectedkelemahan 
      ? char.Kelemahan?.includes(dataForm.selectedkelemahan) 
      : true;

    return matchesSearch && matchestrait && matcheskelebihan && matcheskelemahan;
  });

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-200">
      
      {/* FILTER BOX */}
      <div className="max-w-6xl mx-auto mb-10 space-y-4">
        <input
          type="text"
          name="searchTerm"
          value={dataForm.searchTerm}
          onChange={handleChange}
          placeholder="Cari karakter (Nama, Ras, atau Kelas)..."
          className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none shadow-2xl"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select name="selectedtrait" value={dataForm.selectedtrait} onChange={handleChange} className="p-3 bg-slate-900 border border-slate-700 rounded-xl outline-none">
            <option value="">Semua Trait</option>
            {alltrait.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>

          <select name="selectedkelebihan" value={dataForm.selectedkelebihan} onChange={handleChange} className="p-3 bg-slate-900 border border-slate-700 rounded-xl outline-none">
            <option value="">Semua Kelebihan</option>
            {allkelebihan.map((k, i) => <option key={i} value={k}>{k}</option>)}
          </select>

          <select name="selectedkelemahan" value={dataForm.selectedkelemahan} onChange={handleChange} className="p-3 bg-slate-900 border border-slate-700 rounded-xl outline-none">
            <option value="">Semua Kelemahan</option>
            {allkelemahan.map((k, i) => <option key={i} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      {/* GRID DISPLAY */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => (
          <div key={char.user_id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all group shadow-lg">
            
            {/* Image dengan Aspect Ratio Square agar rapi */}
            <div className="relative aspect-square overflow-hidden bg-slate-800">
              <img 
                src={char.image} 
                alt={char.nama} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  {char.ras}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{char.nama}</h2>
                <p className="text-cyan-600 font-mono text-xs uppercase tracking-tighter">{char.kelas} • {char.Guild}</p>
              </div>

              {/* Tags Section */}
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Traits</p>
                  <div className="flex flex-wrap gap-2">
                    {char.trait?.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 rounded-md text-[10px] text-slate-300 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <p className="text-[9px] text-emerald-500 font-bold uppercase mb-1">Pros</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      {char.Kelebihan?.slice(0, 2).map((k, i) => <li key={i}>• {k}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[9px] text-rose-500 font-bold uppercase mb-1">Cons</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      {char.Kelemahan?.slice(0, 2).map((k, i) => <li key={i}>• {k}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}