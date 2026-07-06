import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import promoFallbackData from "../../Data/Promo.json";
import Container from "../../Layout/Container";
import Button from "../../components/Guest/Button";
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
  const [reviews, setReviews] = useState([]);
  const [promos, setPromos] = useState([]);
  const [promosLoading, setPromosLoading] = useState(true);
  const [promosError, setPromosError] = useState(false);

  const [customersById] = useState(() => {
    try {
      // if available in Data folder (fallback), use it to display reviewer name
      const customers = [];

      
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
  // kept for future UI loading, currently unused to satisfy lint
  // const [promoLoading, setPromoLoading] = useState(true);
  // const [reviewsLoading, setReviewsLoading] = useState(true);


  const [productsError, setProductsError] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") return "";
    const number = Number(value);
    if (Number.isNaN(number)) return String(value);
    return `Rp ${number.toLocaleString('id-ID')}`;
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const handleClaimPromo = async (promoId) => {
    const targetPromo = promos.find((promo) => promo.promo_id === promoId);
    if (!targetPromo) return;

    const currentClaimCount = Number(targetPromo.claim_count ?? 0);
    const claimLimit = Number(targetPromo.claim_limit ?? 0);

    if (currentClaimCount >= claimLimit) return;

    const nextClaimCount = currentClaimCount + 1;

    setPromos((currentPromos) =>
      currentPromos.map((promo) =>
        promo.promo_id === promoId
          ? { ...promo, claim_count: nextClaimCount }
          : promo
      )
    );

    try {
      await promoAPI.updatePromo(promoId, { claim_count: nextClaimCount });
    } catch {
      setPromos((currentPromos) =>
        currentPromos.map((promo) =>
          promo.promo_id === promoId
            ? { ...promo, claim_count: currentClaimCount }
            : promo
        )
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [p, promoResult, r] = await Promise.all([
          productsAPI.fetchProducts(),
          promoAPI.fetchPromo(),
          reviewsAPI.fetchReviews(),
        ]);

        if (!mounted) return;

        const normalizedProducts = Array.isArray(p)
          ? p.map((x) => ({
              product_id: x.product_id,
              nama_product: x.nama_product,
              kategori: x.kategori,
              harga_product: x.harga_product,
              image_url: x.image_url || x.image || x.image_url,
            }))
          : [];

        const normalizedPromos = Array.isArray(promoResult)
          ? promoResult.map((promo) => ({
              ...promo,
              promo_id: promo.promo_id ?? promo.id,
              claim_count: Number(promo.claim_count ?? 0),
              claim_limit: Number(promo.claim_limit ?? 0),
              discount: Number(promo.discount ?? 0),
            }))
          : [];

        setProducts(normalizedProducts.length ? normalizedProducts : productsFallback);
        setPromos(normalizedPromos.length ? normalizedPromos : promoFallbackData);
        setReviews(
          Array.isArray(r)
            ? r
                .slice()
                .sort((a, b) => (new Date(b.tanggal_review || b.created_at || 0)) - (new Date(a.tanggal_review || a.created_at || 0)))
                .slice(0, 3)
            : []
        );

        setProductsLoading(false);
        setPromosLoading(false);
      } catch {
        if (!mounted) return;
        setProducts(productsFallback);
        setPromos(promoFallbackData);
        setProductsLoading(false);
        setPromosLoading(false);
        setProductsError(true);
        setPromosError(true);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);



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

      <section id="promotions" className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <SectionTitle
          title="Promo Tersedia"
          subtitle="Pilih promo yang sedang aktif dan klaim sekarang sebelum kuota penuh."
        />

        {promosLoading && (
          <div className="flex items-center justify-center rounded-3xl border border-white/70 bg-white/80 p-8">
            <p className="text-[#2D2825]/70">Memuat promo...</p>
          </div>
        )}

        {!promosLoading && promosError && (
          <div className="flex items-center justify-center rounded-3xl border border-white/70 bg-white/80 p-8">
            <p className="text-[#2D2825]/70">Promo saat ini tidak tersedia.</p>
          </div>
        )}

        {!promosLoading && !promosError && promos.length === 0 && (
          <div className="flex items-center justify-center rounded-3xl border border-white/70 bg-white/80 p-8">
            <p className="text-[#2D2825]/70">Belum ada promo yang tersedia.</p>
          </div>
        )}

        {!promosLoading && !promosError && promos.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {promos.map((promo) => {
              const isFull = Number(promo.claim_count ?? 0) >= Number(promo.claim_limit ?? 0);
              const isInactive = String(promo.status_promo || "").toLowerCase() === "tidak aktif";
              const isDisabled = isInactive || isFull;
              const claimLabel = isInactive ? "Promo Tidak Aktif" : isFull ? "Kuota Penuh" : "Claim Promo";

              return (
                <div
                  key={promo.promo_id ?? promo.id}
                  className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-md"
                >
                  <div className="bg-[#967259] p-6 text-white">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                        {promo.status_promo || "Aktif"}
                      </span>
                      <span className="text-2xl font-black">{promo.discount ?? 0}%</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-black">{promo.nama_promo}</h3>
                    <p className="mt-2 text-sm text-white/80">
                      Diskon hingga {promo.discount ?? 0}% untuk pelanggan setia.
                    </p>
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between text-sm text-[#2D2825]/70">
                      <span>Periode</span>
                      <span className="font-semibold text-[#2D2825]">
                        {formatDate(promo.start_date)} - {formatDate(promo.end_date)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-[#2D2825]/70">
                      <span>Claim</span>
                      <span className="font-semibold text-[#2D2825]">
                        {promo.claim_count ?? 0}/{promo.claim_limit ?? 0}
                      </span>
                    </div>

                    <Button
                      onClick={() => {
                        if (!isDisabled) {
                          handleClaimPromo(promo.promo_id ?? promo.id);
                        }
                      }}
                      variant={isDisabled ? "secondary" : "primary"}
                      className={`w-full ${isDisabled ? "cursor-not-allowed opacity-70" : ""}`}
                    >
                      {claimLabel}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

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

      <section>
        <p> testing aplikasi</p>
      </section>
    </div>
  );
}
