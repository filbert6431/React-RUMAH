export default function OrderHeader({ orderId, subtitle = "Informasi lengkap mengenai transaksi pelanggan." }) {
  return (
    <div>
      <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
        Detail Pesanan <span className="text-dash-accent">#{orderId}</span>
      </h1>
      <p className="text-white/40 text-sm font-medium">{subtitle}</p>
    </div>
  );
}
