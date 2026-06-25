import products from "../../Data/Products.json";
import { FaSearch, FaFilter, FaShoppingBag } from "react-icons/fa";
import { useState } from "react";
import ProductsTable from "../../components/Admin/ProductsTable";

export default function Products() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const categories = [...new Set(products.map((item) => item.kategori))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      String(product.product_id || "").toLowerCase().includes(_searchTerm) ||
      product.nama_product.toLowerCase().includes(_searchTerm) ||
      product.kategori.toLowerCase().includes(_searchTerm);

    const matchesCategory = dataForm.selectedCategory
      ? product.kategori === dataForm.selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-dash-accent/10 rounded-lg">
              <FaShoppingBag className="text-dash-accent" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Produk</h1>
          </div>
          <p className="text-white/40 text-sm font-medium">Kelola daftar produk dan stok dengan tampilan tabel yang informatif.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 focus-within:ring-2 focus-within:ring-dash-accent/50 transition-all shadow-2xl">
            <FaSearch className="text-white/20 mr-3" />
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari ID, nama, atau kategori..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/20 w-48 md:w-64"
              value={dataForm.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <select
              name="selectedCategory"
              value={dataForm.selectedCategory}
              onChange={handleChange}
              className="appearance-none bg-black/40 border border-white/5 text-white/70 rounded-2xl py-3 pl-6 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-dash-accent/50 transition-all cursor-pointer shadow-2xl"
            >
              <option value="">Semua Kategori</option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-[#2D2825]">
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
              <FaFilter size={12} />
            </div>
          </div>
        </div>
      </div>

      <ProductsTable filteredProducts={filteredProducts} />

      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-[#8E837C] text-xs font-bold uppercase tracking-[0.2em]">
          Showing <span className="text-white">{filteredProducts.length}</span> of {products.length} Total Products
        </p>
        <div className="flex gap-2">
          <div className={`w-2 h-2 rounded-full ${filteredProducts.length > 0 ? 'bg-dash-accent animate-pulse' : 'bg-white/10'}`}></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
        </div>
      </div>
    </div>
  );
}
