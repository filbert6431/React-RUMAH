export default function MembershipHeader({ name, id }) {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-black text-white tracking-tight">Membership Detail</h1>
      <p className="text-white/40 mt-2 text-sm font-medium">
        {name ? `Member: ${name}` : "Member"}
        {id ? ` • ID: ${id}` : ""}
      </p>
    </div>
  );
}

