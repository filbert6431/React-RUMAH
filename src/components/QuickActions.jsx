export default function QuickActions({ categories = ['Topping','Kopi','Bubuk','Snack'], onSelect }) {
  return (
    <div className="flex gap-4 mb-8">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect && onSelect(c)}
          className={`px-6 py-3 rounded-2xl font-bold transition ${c === 'Kopi' ? 'bg-dash-accent text-white shadow-lg' : 'bg-[#2D2825] text-white/70 border border-white/5 hover:bg-white/10'}`}
        >
          {c === 'Kopi' ? '☕ ' + c : c === 'Topping' ? '🍦 ' + c : c === 'Bubuk' ? '🫘 ' + c : '🥐 ' + c}
        </button>
      ))}
    </div>
  );
}
