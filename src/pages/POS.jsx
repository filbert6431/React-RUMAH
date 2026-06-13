import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaCashRegister, FaShoppingCart, FaStar } from "react-icons/fa";
import OrderPanel from "../components/OrderPanel";
import localProducts from "../Data/Products.json";
import { ordersAPI } from "../Services/Orders";
import { productsAPI } from "../Services/Products";

const sizes = ["S", "M", "L"];
const JSON_SERVER_ORDERS_URL = "http://localhost:3000/orders";

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const getToday = () => {
  return new Date().toISOString().slice(0, 10);
};

const normalizeImageUrl = (imageUrl) => {
  if (!imageUrl) return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400";
  return imageUrl.replace("public/", "/");
};

const normalizeProduct = (product, index) => {
  const name = product.name || product.nama_product || "Produk Kopi";
  const category = product.category || product.kategori || "Coffee";

  return {
    product_id: product.product_id || product.id || `CF${String(index + 1).padStart(3, "0")}`,
    name,
    category,
    price: Number(product.price || product.harga_product || 0),
    image: normalizeImageUrl(product.image_url || product.image || product.img),
    rating: product.rating || "4.8",
    review: product.review || product.reviews || 120 + index * 17,
    desc:
      product.desc ||
      product.description ||
      `${name} pilihan ${category.toLowerCase()} favorit untuk pesanan coffee shop.`,
  };
};

const createNextOrderCode = (orders, prefix) => {
  const nextNumber =
    Math.max(
      0,
      ...orders.map((order) => {
        const lastPart = String(order.order_id || "").split("-").pop();
        return Number(lastPart) || 0;
      })
    ) + 1;

  return `${prefix}-${String(nextNumber).padStart(4, "0")}`;
};

export default function POS() {
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await productsAPI.fetchProducts();
        const productSource = fetchedProducts.length > 0 ? fetchedProducts : localProducts;
        setProducts(productSource.map(normalizeProduct));
      } catch {
        // Fallback sederhana supaya POS tetap bisa dipakai saat API belum aktif.
        setProducts(localProducts.map(normalizeProduct));
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  }, [cartItems]);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.product_id] || "M";
    const cartId = `${product.product_id}-${selectedSize}`;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.cartId === cartId);

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartId === cartId ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...currentItems,
        {
          cartId,
          product_id: product.product_id,
          name: product.name,
          size: selectedSize,
          qty: 1,
          price: product.price,
          image: product.image,
        },
      ];
    });

    setMessage(`${product.name} size ${selectedSize} ditambahkan.`);
  };

  const handleIncrease = (cartId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => (item.cartId === cartId ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const handleDecrease = (cartId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => (item.cartId === cartId ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemove = (cartId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.cartId !== cartId));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    setMessage("");

    try {
      const existingOrders = await ordersAPI.fetchOrders();
      const orderYear = new Date().getFullYear();
      const nextOrderNumber = createNextOrderCode(existingOrders, `ORD-${orderYear}`);
      const nextCustomerNumber = createNextOrderCode(existingOrders, "CUST");

      const newOrder = {
        order_id: nextOrderNumber,
        customer_id: nextCustomerNumber,
        status: "Processing",
        order_date: getToday(),
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          name: item.name,
          size: item.size,
          qty: item.qty,
          price: item.price,
        })),
      };

      let savedToJsonServer = false;

      // Simpan ke JSON Server jika server lokal sedang berjalan.
      try {
        await axios.post(JSON_SERVER_ORDERS_URL, { ...newOrder, total: totalPrice });
        savedToJsonServer = true;
      } catch {
        savedToJsonServer = false;
      }

      // Tetap simpan lewat service yang sudah dipakai halaman Orders saat ini.
      await ordersAPI.createOrder(newOrder);
      setCartItems([]);
      setMessage(
        savedToJsonServer
          ? `Checkout berhasil. Order ${nextOrderNumber} tersimpan.`
          : `Checkout berhasil. Order ${nextOrderNumber} tersimpan lokal.`
      );
    } catch {
      setMessage("Checkout gagal. Coba jalankan server data lalu ulangi lagi.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-dash-accent/15 rounded-xl">
              <FaCashRegister className="text-dash-accent" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">POS</h1>
          </div>
          <p className="text-white/45 text-sm font-medium">
            Buat pesanan baru dari kartu produk visual seperti kasir coffee shop.
          </p>
        </div>

        {message && (
          <div className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-sm font-bold text-white">
            {message}
          </div>
        )}
      </div>

      <div className="flex flex-col xl:flex-row h-full gap-6 overflow-hidden">
        <section className="xl:flex-[3] overflow-y-auto pr-1 xl:pr-4 scrollbar-hide pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading && (
              <div className="col-span-full bg-white/10 border border-white/10 rounded-[32px] p-8 text-white font-bold">
                Memuat produk...
              </div>
            )}

            {!isLoading &&
              products.map((product) => {
                const selectedSize = selectedSizes[product.product_id] || "M";

                return (
                  <div
                    key={product.product_id}
                    className="bg-[#E5D9D0] rounded-[32px] p-5 flex flex-col gap-4 shadow-2xl text-gray-800"
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        className="w-24 h-24 rounded-2xl object-cover shadow-md bg-white"
                        alt={product.name}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-dash-accent uppercase tracking-widest">
                          {product.category}
                        </p>
                        <h3 className="font-black text-xl text-[#2D2825] truncate">{product.name}</h3>
                        <p className="text-[11px] text-gray-500 leading-tight mt-1 font-medium">
                          {product.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center px-2 py-3 border-y border-black/5">
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Rating</p>
                        <div className="flex items-center gap-1 font-bold text-sm">
                          <FaStar className="text-orange-500" /> {product.rating}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Review</p>
                        <p className="font-bold text-sm">({product.review})</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Harga</p>
                        <p className="font-black text-sm font-Poppins text-dash-accent">
                          {formatRupiah(product.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Pilih Size</p>
                        <div className="flex gap-2">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeChange(product.product_id, size)}
                              className={`w-9 h-8 rounded-xl text-xs font-black transition ${
                                selectedSize === size
                                  ? "bg-[#2D2825] text-white shadow-lg"
                                  : "bg-white/50 text-gray-600 hover:bg-white"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="bg-dash-accent text-white px-5 py-3 rounded-2xl text-[10px] font-black shadow-lg hover:brightness-110 active:scale-95 transition uppercase tracking-tighter flex items-center gap-2"
                      >
                        <FaShoppingCart size={12} />
                        + Order
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        <OrderPanel
          orderNumber="#POS"
          items={cartItems}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onCheckout={handleCheckout}
          isCheckingOut={isCheckingOut}
        />
      </div>
    </div>
  );
}
