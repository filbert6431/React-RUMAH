import { useState } from "react";
import { Button } from "../components/ui/button";

export default function ProductsTable({ filteredProducts }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 25;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = filteredProducts.slice(start, end);

  return (
    <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[10px] font-black tracking-[0.2em]">
            <tr>
              <th className="p-8 text-center">ID</th>
              <th className="p-8">Produk</th>
              <th className="p-8">Foto</th>
              <th className="p-8 text-center">Kategori</th>
              <th className="p-8 text-center">Stok</th>
              <th className="p-8 text-right">Harga</th>
            </tr>
          </thead>
          <tbody className="text-[#E5D9D0]">
            {currentData.length > 0 ? (
              currentData.map((product) => (
                <tr key={product.product_id} className="border-t border-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group">
                  <td className="p-8 text-center">
                    <span className="bg-[#141110] text-dash-accent border border-dash-accent/20 px-4 py-2 rounded-xl text-xs font-black group-hover:border-dash-accent/60 transition-all">
                      {product.product_id}
                    </span>
                  </td>
                  <td className="p-8">
                    <div>
                      <p className="text-lg font-black text-white group-hover:text-dash-accent transition-colors leading-none">
                        {product.nama_product}
                      </p>
                      <p className="text-[10px] text-white/20 uppercase font-bold tracking-[0.15em] mt-1.5">
                        {product.product_id}
                      </p>
                    </div>
                  </td>
                  <td className="p-8">
                    <img
                      src={product.image_url}
                      alt={product.nama_product}
                      className="w-24 h-16 object-cover rounded-3xl border border-white/10 shadow-inner"
                    />
                  </td>
                  <td className="p-8 text-center">
                    <span className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-slate-400/10 text-slate-300 border border-slate-400/20">
                      {product.kategori}
                    </span>
                  </td>
                  <td className="p-8 text-center">
                    <span className="text-sm font-black text-white">{product.stock}</span>
                  </td>
                  <td className="p-8 text-right">
                    <span className="text-lg font-black text-white">Rp {Number(product.harga_product).toLocaleString('id-ID')}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-32 text-center text-white/10">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-xl font-black italic tracking-widest uppercase">Produk tidak ditemukan</p>
                    <p className="text-sm">Ubah kata kunci atau kategori untuk melihat data lagi.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4 justify-center items-center">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span>Page {page}</span>
          <Button disabled={end >= filteredProducts.length} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
