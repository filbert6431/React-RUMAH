import { useEffect, useMemo, useState } from "react";

import Container from "../../Layout/Container";
import PageBanner from "../../components/Guest/PageBanner";
import { productsAPI } from "../../Services/Products";
import { ordersAPI } from "../../Services/Orders";
import { formatRupiah, getOrderTotal } from "../../lib/orderUtils";

const menuFallback = [
  {
    product_id: 1,
    nama_product: "Espresso",
    kategori: "Coffee",
    harga_product: 20000,
    image_url: "/images/espresso.jpg",
    description: "",
  },
];

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // cart: product_id -> qty
  const [cart, setCart] = useState({});
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  const normalizedProducts = useMemo(() => {
    return (Array.isArray(products) ? products : []).map((p) => ({
      product_id: p.product_id,
      nama_product: p.nama_product,
      kategori: p.kategori,
      harga_product: Number(p.harga_product ?? 0),
      image_url: p.image_url,
      description: p.description || p.keterangan || "",
    }));
  }, [products]);

  const cartItems = useMemo(() => {
    return normalizedProducts
      .filter((p) => (cart[p.product_id] ?? 0) > 0)
      .map((p) => ({
        product_id: p.product_id,
        name: p.nama_product,
        qty: cart[p.product_id],
        price: p.harga_product,
      }));
  }, [cart, normalizedProducts]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, it) => acc + Number(it.qty || 0), 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => getOrderTotal(cartItems), [cartItems]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await productsAPI.fetchProducts();
        if (!mounted) return;
        setProducts(Array.isArray(data) && data.length ? data : menuFallback);
      } catch (e) {
        if (!mounted) return;
        setProducts(menuFallback);
        setError("Produk tidak dapat dimuat saat ini.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const incQty = (productId) => {
    setCheckoutSuccess("");
    setCheckoutError("");
    setCart((prev) => {
      const next = { ...prev };
      next[productId] = (next[productId] ?? 0) + 1;
      return next;
    });
  };

  const decQty = (productId) => {
    setCheckoutSuccess("");
    setCheckoutError("");
    setCart((prev) => {
      const next = { ...prev };
      const curr = Number(next[productId] ?? 0);
      const nextQty = curr - 1;
      if (nextQty <= 0) {
        delete next[productId];
      } else {
        next[productId] = nextQty;
      }
      return next;
    });
  };

  const renderQtyControl = (productId) => {
    const qty = Number(cart[productId] ?? 0);
    if (!qty) {
      return (
        <button
          type="button"
          onClick={() => incQty(productId)}
          className="px-5 py-3 rounded-xl bg-[#F4EFEA] hover:bg-[#967259] hover:text-white text-[#2D2825] font-bold"
        >
          +
        </button>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => decQty(productId)}
          className="w-12 h-12 rounded-xl bg-[#F4EFEA] hover:bg-[#967259] hover:text-white text-[#2D2825] font-black"
        >
          −
        </button>
        <span className="font-black text-lg w-10 text-center">{qty}</span>
        <button
          type="button"
          onClick={() => incQty(productId)}
          className="w-12 h-12 rounded-xl bg-[#F4EFEA] hover:bg-[#967259] hover:text-white text-[#2D2825] font-black"
        >
          +
        </button>
      </div>
    );
  };

  const handleCheckout = async () => {
    if (!cartItems.length) return;
    setCheckoutLoading(true);
    setCheckoutSuccess("");
    setCheckoutError("");

    try {
      const order_payload = {
        order_id: `ORD-GUEST-${Date.now()}`,
        order_date: new Date().toISOString(),
        customer_id: null,
        items: cartItems.map((it) => ({
          name: it.name,
          qty: it.qty,
          price: it.price,
        })),
        status: "Pending",
      };

      await ordersAPI.createOrder(order_payload);

      setCheckoutSuccess("Checkout berhasil! Pesanan tersimpan.");
      setCart({});
    } catch (e) {
      setCheckoutError("Checkout gagal. Silakan coba lagi.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="bg-[#F4EFEA] text-[#2D2825]">
      <PageBanner
        title="Our Menu"
        subtitle="Choose your favorite handcrafted coffee."
      />

      <section className="py-16">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#1A1614] md:text-4xl">
              Coffee Menu
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#2D2825]/70">
              Simple drinks made with quality beans and fresh ingredients.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-white/70 border border-white/80 p-4 text-sm text-[#2D2825]/70">
              {error}
            </div>
          )}

          {checkoutSuccess && (
            <div className="mb-6 rounded-2xl bg-green-500/10 border border-green-500/20 p-4 text-sm text-green-600 font-bold">
              {checkoutSuccess}
            </div>
          )}
          {checkoutError && (
            <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-600 font-bold">
              {checkoutError}
            </div>
          )}

          {loading ? (
            <div className="rounded-3xl bg-white/60 border border-white/70 p-8 text-center">
              Loading products...
            </div>
          ) : normalizedProducts.length === 0 ? (
            <div className="rounded-3xl bg-white/60 border border-white/70 p-8 text-center">
              Produk belum tersedia.
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {normalizedProducts.map((p) => {
                const img = p.image_url
                  ? p.image_url.startsWith("http")
                    ? p.image_url
                    : `/${String(p.image_url).replace(/^\//, "")}`
                  : "";

                return (
                  <div
                    key={p.product_id}
                    className="bg-white p-5 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-gray-100"
                  >
                    <div className="w-full h-64 rounded-[24px] overflow-hidden mb-6 relative">
                      <img
                        src={img}
                        alt={p.nama_product}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="font-black text-lg tracking-wide text-[#2D2825]">
                        {p.nama_product}
                      </h3>
                      {p.description ? (
                        <p className="text-sm leading-6 text-gray-500">
                          {p.description}
                        </p>
                      ) : null}
                      <div className="flex justify-center gap-3 text-sm font-bold">
                        <span className="text-amber-700">
                          {formatRupiah(p.harga_product)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      {renderQtyControl(p.product_id)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {cartItems.length > 0 && (
        <div className="fixed left-0 right-0 bottom-0 bg-white/90 backdrop-blur border-t border-black/5">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#8E837C]">
                {totalItems} Item{totalItems > 1 ? "s" : ""}
              </div>
              <div className="font-black text-2xl text-[#1A1614]">
                {formatRupiah(totalPrice)}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="px-8 py-4 rounded-2xl bg-[#967259] text-white font-black uppercase tracking-widest disabled:opacity-60"
            >
              {checkoutLoading ? "Checking out..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

