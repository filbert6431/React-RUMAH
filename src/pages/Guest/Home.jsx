import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Container from "../../Layout/Container";
import RatingStars from "../../components/Guest/RatingStar";
import { productsAPI } from "../../Services/Products";
import { promoAPI } from "../../Services/Promo";
import { reviewsAPI } from "../../Services/Reviews";



const heroImage =
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=85";

const productsFallback = [
  {
    product_id: 1,
    nama_product: "Caramel Latte",
    kategori: "Coffee",
    harga_product: 32000,
    image_url: "",
  },
  {
    product_id: 2,
    nama_product: "Cappuccino",
    kategori: "Coffee",
    harga_product: 28000,
    image_url: "",
  },
  {
    product_id: 3,
    nama_product: "Americano",
    kategori: "Coffee",
    harga_product: 25000,
    image_url: "",
  },
];


function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-black text-[#1A1614] md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-[#2D2825]/70">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [promo, setPromo] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [customersById] = useState(() => {
    try {
      // if available in Data folder (fallback), use it to display reviewer name
      // eslint-disable-next-line import/no-unresolved
      const customers = require("../../Data/Customers.json");
      const map = new Map();
      if (Array.isArray(customers)) {
        customers.forEach((c) => {
          map.set(String(c.customer_id ?? c.id ?? ""), c);
          map.set(String(c.customer_id ?? c.id ?? ""), c);
        });
      }
      return map;
    } catch {
      return new Map();
    }
  });


  const [productsLoading, setProductsLoading] = useState(true);
  const [promoLoading, setPromoLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [productsError, setProductsError] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") return "";
    const number = Number(value);
    if (Number.isNaN(number)) return String(value);
    return `Rp ${number.toLocaleString('id-ID')}`;
  };

  const leftIndex = useMemo(() => {
    if (!products.length) return 0;
    return (activeIndex - 1 + products.length) % products.length;
  }, [activeIndex, products.length]);

  const rightIndex = useMemo(() => {
    if (!products.length) return 0;
    return (activeIndex + 1) % products.length;
  }, [activeIndex, products.length]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [p, pr, r] = await Promise.all([
          productsAPI.fetchProducts(),
          promoAPI.fetchPromo(),
          reviewsAPI.fetchReviews(),
        ]);

        if (!mounted) return;

        // normalize shape (Supabase returns column names)
        const normalizedProducts = Array.isArray(p)
          ? p.map((x) => ({
              product_id: x.product_id,
              nama_product: x.nama_product,
              kategori: x.kategori,
              harga_product: x.harga_product,
              image_url: x.image_url || x.image || x.image_url,
            }))
          : [];

        setProducts(normalizedProducts.length ? normalizedProducts : productsFallback);
        setPromo(Array.isArray(pr) ? pr : []);
        setReviews(
          Array.isArray(r)
            ? r
                .slice()
                .sort((a, b) => (new Date(b.tanggal_review || b.created_at || 0)) - (new Date(a.tanggal_review || a.created_at || 0)))
                .slice(0, 3)
            : []
        );

        setProductsLoading(false);
        setPromoLoading(false);
        setReviewsLoading(false);
      } catch (e) {
        if (!mounted) return;
        setProducts(productsFallback);
        setProductsLoading(false);
        setProductsError(true);
        setPromoLoading(false);
        setReviewsLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const sortedPromo = useMemo(() => {
    if (!promo?.length) return [];
    return promo
      .slice()
      .sort((a, b) => new Date(b.start_date || b.created_at || 0) - new Date(a.start_date || a.created_at || 0))
      .slice(0, 3);
  }, [promo]);

  return (
    <div className="bg-[#F4EFEA] text-[#2D2825]">
      {/* Area Top (Awareness Section) */}

      <section
        aria-labelledby="home-hero-title"
        className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-10 lg:px-16"
      >
        <div>
          <p className="mb-4 font-bold uppercase tracking-widest text-[#967259]">
            Coffee House
          </p>
          <h1 id="home-hero-title" className="text-4xl font-black leading-tight text-[#1A1614] md:text-6xl">
            Fresh Coffee Made For Every Mood
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#2D2825]/75">
            Kami menyajikan kopi handcrafted dengan rasa yang konsisten dan
            suasana yang nyaman—untuk kamu yang datang buat menikmati momen.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/Menu"
              className="rounded-xl bg-[#967259] px-6 py-3 text-center font-bold text-white transition hover:bg-[#7e5e47]"
            >
              Explore Menu
            </Link>
            <a
              href="#promotions"
              className="rounded-xl border border-[#967259] px-6 py-3 text-center font-bold text-[#967259] transition hover:bg-white"
            >
              Lihat Promo
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-xl">
          <img
            src={heroImage}
            alt="Fresh coffee"
            className="h-[360px] w-full object-cover md:h-[500px]"
          />
        </div>
      </section>

      {/* Area Middle (Value & Trust Section) */}

      {/* Section 2 - About Company */}
      <section className="py-16">

        <Container>
          <SectionTitle
            title="Tentang Coffee House"
            subtitle="Kopi handcrafted, suasana nyaman, dan pelayanan yang ramah."
          />

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-3xl font-black text-[#1A1614] md:text-4xl">
                Tempat untuk menikmati momen.
              </h3>
              <p className="mt-5 leading-8 text-[#2D2825]/75">
                Coffee House berfokus pada rasa yang konsisten dan kualitas bahan
                baku. Kami ingin setiap kunjungan terasa mudah, nyaman, dan
                menyenangkan—baik untuk santai maupun produktif.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-6 shadow-md border border-white/70">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#967259]">
                    Visi
                  </p>
                  <p className="mt-2 font-black text-[#1A1614]">
                    Kopi yang konsisten untuk semua orang.
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-md border border-white/70">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#967259]">
                    Nilai Utama
                  </p>
                  <p className="mt-2 font-black text-[#1A1614]">
                    Rasa, kenyamanan, dan pelayanan.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={heroImage}
                alt="Coffee House"
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3 - Product / Service Highlight */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <SectionTitle
          title="Produk & Layanan"
          subtitle="Pilihan minuman favorit dengan rasa yang mudah dicintai."
        />

        {/* Product Highlight Carousel (simple, no extra libs) */}
        <div className="relative">
          {productsLoading && (
            <div className="flex items-center justify-center rounded-3xl bg-white/80 border border-white/70 p-8">
              <p className="text-[#2D2825]/70">Loading produk...</p>
            </div>
          )}

          {!productsLoading && productsError && (
            <div className="flex items-center justify-center rounded-3xl bg-white/80 border border-white/70 p-8">
              <p className="text-[#2D2825]/70">Produk saat ini tidak tersedia.</p>
            </div>
          )}

          {!productsLoading && !productsError && products.length === 0 && (
            <div className="flex items-center justify-center rounded-3xl bg-white/80 border border-white/70 p-8">
              <p className="text-[#2D2825]/70">Produk belum ada.</p>
            </div>
          )}

          {!productsLoading && !productsError && products.length > 0 && (
            <>
              {/* Center Highlight Horizontal Scrollable Carousel (no Prev/Next buttons) */}
              <div className="relative">
                <div className="overflow-hidden rounded-3xl bg-white/30">
                  <div className="px-2 py-2">
                    <div className="flex items-stretch gap-4 overflow-x-auto">
                      {products.map((prod, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                          <div
                            key={prod.product_id ?? idx}
                            className={`shrink-0 transition-all duration-300 transform ${
                              isActive ? "w-[78%] sm:w-[42%] md:w-[28%] lg:w-[22%] shadow-2xl" : "w-[62%] sm:w-[36%] md:w-[23%] lg:w-[18%] shadow-sm"
                            }`}
                            onMouseEnter={() => setActiveIndex(idx)}
                          >
                            <div
                              className={`h-full rounded-3xl bg-white border border-white/70 overflow-hidden ${
                                isActive ? "ring-2 ring-[#967259]/40" : ""
                              }`}
                            >
                              <img
                                src={prod.image_url ? `/${prod.image_url.replace(/^public\//, '')}` : prod.image_url || ""}
                                alt={prod.nama_product || "Product"}
                                className={`w-full object-cover ${isActive ? "h-56" : "h-40"}`}
                                loading={isActive ? "eager" : "lazy"}
                              />
                              <div className="p-4">
                                <h3 className="text-sm sm:text-base font-black text-[#1A1614]">
                                  {prod.nama_product}
                                </h3>
                                {prod.harga_product !== undefined && (
                                  <p className="mt-2 text-sm font-bold text-[#967259]">
                                    {formatPrice(prod.harga_product)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* hint for mobile */}
              {products.length > 0 && (
                <p className="mt-4 text-center text-sm text-[#2D2825]/60">
                  Geser untuk melihat produk lainnya.
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-[#F4EFEA] p-6 border border-white/70">
            <p className="text-sm font-bold uppercase tracking-widest text-[#967259]">
              Koleksi Kopi
            </p>
            <p className="mt-2 font-black text-[#1A1614]">Minuman signature setiap hari.</p>
          </div>
          <div className="rounded-3xl bg-[#F4EFEA] p-6 border border-white/70">
            <p className="text-sm font-bold uppercase tracking-widest text-[#967259]">
              Promo Terjadwal
            </p>
            <p className="mt-2 font-black text-[#1A1614]">Penawaran menarik tanpa ribet.</p>
          </div>
          <div className="rounded-3xl bg-[#F4EFEA] p-6 border border-white/70">
            <p className="text-sm font-bold uppercase tracking-widest text-[#967259]">
              Review Pelanggan
            </p>
            <p className="mt-2 font-black text-[#1A1614]">Bukti pengalaman nyata.</p>
          </div>
        </div>
      </section>

      {/* Section 4 - Why Choose Us */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <SectionTitle
          title="Why Coffee House?"
          subtitle="Keunggulan yang membuat kamu ingin kembali lagi."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-md border border-white/70">
            <h3 className="text-xl font-black text-[#1A1614]">Kopi Handcrafted</h3>
            <p className="mt-3 leading-7 text-[#2D2825]/70">
              Racikan rapi untuk rasa yang enak dan stabil.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-md border border-white/70">
            <h3 className="text-xl font-black text-[#1A1614]">Suasana Nyaman</h3>
            <p className="mt-3 leading-7 text-[#2D2825]/70">
              Hangat untuk belajar, meeting santai, atau quality time.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-md border border-white/70">
            <h3 className="text-xl font-black text-[#1A1614]">Pelayanan Ramah</h3>
            <p className="mt-3 leading-7 text-[#2D2825]/70">
              Rekomendasi menu yang pas sesuai selera kamu.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 - Testimonial Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <SectionTitle
          title="Testimonial Pelanggan"
          subtitle="Preview review pelanggan yang sudah menikmati kopi kami."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review) => {
            const reviewerKey = String(review.customer_id ?? review.id ?? "");
            const reviewer = customersById.get(reviewerKey);
            const reviewerName = reviewer?.nama_customer || review.nama_customer || review.customer_id || "Anonymous";
            const stars = review.star_review ?? review.rating ?? 0;
            const text =
              review.review_text ??
              (review.comment || "");



            return (
              <div
                key={review.review_id ?? review.id ?? reviewerName}
                className="rounded-3xl bg-white p-6 shadow-md border border-white/70"
              >
                <RatingStars rating={stars} setRating={() => {}} />
                <p className="mt-5 leading-7 text-[#2D2825]/75">"{text}"</p>
                <h3 className="mt-6 font-black text-[#1A1614]">{reviewerName}</h3>
              </div>
            );
          })}
        </div>
      </section>



      {/* Call To Action Section */}
      <section className="bg-[#1A1614] px-6 py-16 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">
            Ready To Enjoy Your Coffee?
          </h2>
          <p className="mt-4 text-white/70">
            Explore our menu and share your experience.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/Menu"
              className="rounded-xl bg-[#967259] px-6 py-3 font-bold text-white transition hover:bg-[#7e5e47]"
            >
              View Menu
            </Link>
            <Link
              to="/Review_Guest"
              className="rounded-xl bg-white px-6 py-3 font-bold text-[#1A1614] transition hover:bg-[#F4EFEA]"
            >
              Leave Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
