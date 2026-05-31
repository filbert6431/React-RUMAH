export default function MembershipHeader({ name, id, subtitle }) {
  return (
    <div className="border-b border-white/10 pb-6">
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-dash-accent font-mono uppercase tracking-widest">
        ID Member: #{id}
      </p>
      {subtitle && <p className="mt-2 text-white/50">{subtitle}</p>}
    </div>
  );
}
