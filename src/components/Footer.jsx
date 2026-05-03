export default function Footer() {
  return (
    // Kita buat transparan dan teksnya abu-abu agar tidak merusak vibe gelap dashboard
    <div className="bg-transparent text-center py-4 text-[10px] text-gray-500 uppercase tracking-widest">
      <div className="flex items-center justify-center gap-4 opacity-50">
        <div className="h-[1px] w-10 bg-gray-600"></div>
        <span>© 2026 Doge Coffee • POS System v1.0</span>
        <div className="h-[1px] w-10 bg-gray-600"></div>
      </div>
    </div>
  );
}