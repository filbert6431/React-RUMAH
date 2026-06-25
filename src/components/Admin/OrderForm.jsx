import { FaPlus, FaTrash } from "react-icons/fa";
import products from "../../Data/Products.json";
import { emptyOrderItem, formatRupiah, getOrderTotal } from "../../lib/orderUtils";

export default function OrderForm({
  dataForm,
  editId,
  loading,
  onCancel,
  onChange,
  onSubmit,
}) {
  const total = getOrderTotal(dataForm.items);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...dataForm, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const nextItems = dataForm.items.map((item, itemIndex) => {
      if (itemIndex !== index) return item;

      // Keep number inputs as numbers so total calculation stays simple.
      return {
        ...item,
        [field]: field === "qty" || field === "price" ? Number(value) : value,
      };
    });

    onChange({ ...dataForm, items: nextItems });
  };

  const handleProductSelect = (index, productName) => {
    const product = products.find((item) => item.nama_product === productName);

    const nextItems = dataForm.items.map((item, itemIndex) => {
      if (itemIndex !== index) return item;

      // Choosing a product also fills the matching menu price.
      return {
        ...item,
        name: productName,
        price: product ? Number(product.harga_product) : item.price,
      };
    });

    onChange({ ...dataForm, items: nextItems });
  };

  const addItem = () => {
    onChange({
      ...dataForm,
      items: [...dataForm.items, { ...emptyOrderItem }],
    });
  };

  const removeItem = (index) => {
    const nextItems = dataForm.items.filter((_, itemIndex) => itemIndex !== index);

    // Keep one empty row so the form is never confusingly blank.
    onChange({
      ...dataForm,
      items: nextItems.length ? nextItems : [{ ...emptyOrderItem }],
    });
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/70">
          Order ID
          <input
            name="order_id"
            value={dataForm.order_id}
            onChange={handleFieldChange}
            required
            className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50"
          />
        </label>

        <label className="space-y-2 text-sm text-white/70">
          Customer ID
          <input
            name="customer_id"
            value={dataForm.customer_id}
            onChange={handleFieldChange}
            required
            className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/70">
          Status Pesanan
          <select
            name="status"
            value={dataForm.status}
            onChange={handleFieldChange}
            className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50"
          >
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-white/70">
          Tanggal Pesanan
          <input
            type="date"
            name="order_date"
            value={dataForm.order_date}
            onChange={handleFieldChange}
            required
            className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50"
          />
        </label>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-dash-accent">
            Items
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white transition hover:bg-dash-accent hover:text-black"
          >
            <FaPlus size={12} />
            Add Item
          </button>
        </div>

        {dataForm.items.map((item, index) => (
          <div
            key={index}
            className="grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_100px_140px_auto]"
          >
            <label className="space-y-2 text-sm text-white/70">
              Menu
              <select
                value={item.name}
                onChange={(event) => handleProductSelect(index, event.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-dash-accent/50"
              >
                <option value="">Pilih menu</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.nama_product}>
                    {product.nama_product}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm text-white/70">
              Qty
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(event) => handleItemChange(index, "qty", event.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-dash-accent/50"
              />
            </label>

            <label className="space-y-2 text-sm text-white/70">
              Price
              <input
                type="number"
                min="0"
                value={item.price}
                onChange={(event) => handleItemChange(index, "price", event.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-dash-accent/50"
              />
            </label>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300 transition hover:bg-red-500 hover:text-white"
                aria-label={`Remove item ${index + 1}`}
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-3xl bg-dash-accent p-6 text-[#1A1614] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-60">
            Total Otomatis
          </p>
          <p className="text-4xl font-black tracking-tight">{formatRupiah(total)}</p>
        </div>
        <p className="max-w-sm text-xs font-bold opacity-70">
          Total dihitung dari semua item dengan rumus qty dikali price.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-3xl bg-dash-accent px-8 py-4 font-black uppercase tracking-[0.2em] text-black transition hover:bg-dash-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {editId ? "Update Pesanan" : "Tambah Pesanan"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-3xl border border-white/10 px-8 py-4 font-black uppercase tracking-[0.2em] text-white transition hover:bg-white/5"
          >
            Batal Edit
          </button>
        )}
      </div>
    </form>
  );
}
