import { createElement, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FaBoxOpen,
  FaChartLine,
  FaCoffee,
  FaFire,
  FaShoppingCart,
  FaStar,
  FaTags,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { dashboardDataAPI } from "../../Services/dashboardData";
import {
  formatRupiahCompact,
  getAverageRating,
  getBestSeller,
  getLowStockProducts,
  getProductName,
  getProductRevenueRanking,
  getProductSalesRanking,
  getProductTrendComparison,
  getPromoUsage,
  getRecentReviews,
  getRevenueTrend,
  getStockChartData,
  getTotalPromoClaims,
  getTotalRevenue,
} from "../../lib/dashboardAnalytics";

const chartColors = ["#D4A373", "#7FB069", "#6EA8FE", "#F4A261", "#E76F51", "#B388EB"];

const emptyDashboardData = {
  customers: [],
  orders: [],
  products: [],
  reviews: [],
  staff: [],
  promo: [],
};

export default function Dashboard() {
  const [activeDashboard, setActiveDashboard] = useState("overview");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [dashboardData, setDashboardData] = useState(emptyDashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await dashboardDataAPI.fetchDashboardData();
        setDashboardData(data);

        const initialProducts = data.products.slice(0, 3).map(getProductName);
        setSelectedProducts(initialProducts);
      } catch (err) {
        setError(err.message || "Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const analytics = useMemo(() => {
    const { customers, orders, products, reviews, promo } = dashboardData;
    const bestSeller = getBestSeller(orders);
    const averageRating = getAverageRating(reviews);

    return {
      totalRevenue: getTotalRevenue(orders),
      totalOrders: orders.length,
      totalMembers: customers.length,
      totalPromoClaims: getTotalPromoClaims(promo),
      bestSeller,
      averageRating,
      revenueTrend: getRevenueTrend(orders),
      promoUsage: getPromoUsage(promo),
      recentReviews: getRecentReviews(reviews, customers),
      salesRanking: getProductSalesRanking(orders),
      revenueRanking: getProductRevenueRanking(orders),
      stockChart: getStockChartData(products),
      lowStockProducts: getLowStockProducts(products),
      productTrendComparison: getProductTrendComparison(orders, selectedProducts),
    };
  }, [dashboardData, selectedProducts]);

  const toggleProduct = (productName) => {
    setSelectedProducts((currentProducts) => {
      if (currentProducts.includes(productName)) {
        return currentProducts.filter((name) => name !== productName);
      }

      return [...currentProducts, productName];
    });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="rounded-[32px] bg-[#2D2825] border border-white/10 px-8 py-6 text-white font-black">
          Memuat dashboard analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">
      <DashboardHeader activeDashboard={activeDashboard} onChangeDashboard={setActiveDashboard} />

      {error && (
        <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-4 text-red-100">
          {error}
        </div>
      )}

      {activeDashboard === "overview" ? (
        <OverviewDashboard analytics={analytics} />
      ) : (
        <SalesAnalyticsDashboard
          analytics={analytics}
          products={dashboardData.products}
          selectedProducts={selectedProducts}
          onToggleProduct={toggleProduct}
        />
      )}
    </div>
  );
}

function DashboardHeader({ activeDashboard, onChangeDashboard }) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-dash-accent/15 rounded-xl">
            <FaChartLine className="text-dash-accent" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Coffee Shop Dashboard</h1>
        </div>
        <p className="text-white/45 text-sm font-medium">
          Ringkasan performa bisnis, penjualan produk, promo, review, dan stok dari data JSON.
        </p>
      </div>

      <div className="flex bg-black/30 border border-white/10 p-1.5 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => onChangeDashboard("overview")}
          className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition ${
            activeDashboard === "overview" ? "bg-dash-accent text-white" : "text-white/50 hover:text-white"
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => onChangeDashboard("sales")}
          className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition ${
            activeDashboard === "sales" ? "bg-dash-accent text-white" : "text-white/50 hover:text-white"
          }`}
        >
          Sales Analytics
        </button>
      </div>
    </div>
  );
}

function OverviewDashboard({ analytics }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          icon={FaWallet}
          label="Total Revenue"
          value={formatRupiahCompact(analytics.totalRevenue)}
          tone="green"
        />
        <KpiCard icon={FaShoppingCart} label="Total Orders" value={analytics.totalOrders} tone="blue" />
        <KpiCard icon={FaUsers} label="Total Members" value={analytics.totalMembers} tone="purple" />
        <KpiCard icon={FaTags} label="Promo Claims" value={analytics.totalPromoClaims} tone="orange" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardPanel title="Business Highlights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HighlightCard
              icon={FaFire}
              label="Best Seller Product"
              title={analytics.bestSeller.name}
              description={`${analytics.bestSeller.qty} units sold`}
            />
            <HighlightCard
              icon={FaStar}
              label="Company Rating"
              title={`${analytics.averageRating.toFixed(1)} / 5`}
              description={`${analytics.recentReviews.length} latest reviews shown`}
            />
          </div>
        </DashboardPanel>

        <DashboardPanel title="Promo Analytics">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.promoUsage}
                  dataKey="claims"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {analytics.promoUsage.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Claims`, "Claim Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardPanel>
      </div>

      <DashboardPanel title="Sales Performance">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="#B8AAA0" />
              <YAxis stroke="#B8AAA0" tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value) => [formatRupiahCompact(value), "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#D4A373"
                strokeWidth={4}
                dot={{ r: 5, fill: "#D4A373" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardPanel>

      <DashboardPanel title="Recent Reviews">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {analytics.recentReviews.map((review) => (
            <div key={review.id} className="bg-black/25 border border-white/10 rounded-[24px] p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-white font-black text-sm truncate">{review.customerName}</p>
                <span className="flex items-center gap-1 text-dash-accent text-xs font-black">
                  <FaStar /> {review.rating}
                </span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{review.comment}</p>
              <p className="text-white/25 text-[10px] font-bold mt-4 uppercase tracking-widest">{review.date}</p>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </div>
  );
}

function SalesAnalyticsDashboard({ analytics, products, selectedProducts, onToggleProduct }) {
  const topSales = analytics.salesRanking.slice(0, 5);
  const bottomSales = [...analytics.salesRanking].reverse().slice(0, 5);
  const topRevenue = analytics.revenueRanking.slice(0, 5);

  return (
    <div className="space-y-8">
      <DashboardPanel title="Product Comparison">
        <div className="flex flex-wrap gap-3 mb-6">
          {products.map((product) => {
            const productName = getProductName(product);
            const isSelected = selectedProducts.includes(productName);

            return (
              <button
                key={product.product_id || productName}
                type="button"
                onClick={() => onToggleProduct(productName)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition ${
                  isSelected
                    ? "bg-dash-accent text-white shadow-lg"
                    : "bg-black/30 border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {productName}
              </button>
            );
          })}
        </div>

        <div className="h-[330px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.productTrendComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="#B8AAA0" />
              <YAxis stroke="#B8AAA0" allowDecimals={false} />
              <Tooltip />
              <Legend />
              {selectedProducts.map((productName, index) => (
                <Line
                  key={productName}
                  type="monotone"
                  dataKey={productName}
                  stroke={chartColors[index % chartColors.length]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardPanel>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RankingPanel title="Top 5 Best Selling Products" items={topSales} valueKey="qty" suffix="Units" />
        <RankingPanel title="Bottom 5 Lowest Selling Products" items={bottomSales} valueKey="qty" suffix="Units" />
        <RankingPanel title="Top Revenue Products" items={topRevenue} valueKey="revenue" isCurrency />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <DashboardPanel title="Inventory Analytics">
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.stockChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#B8AAA0" tick={{ fontSize: 11 }} />
                <YAxis stroke="#B8AAA0" allowDecimals={false} />
                <Tooltip />
                <ReferenceLine y={20} stroke="#E76F51" strokeDasharray="5 5" label="Min 20" />
                <Bar dataKey="stock" fill="#D4A373" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardPanel>

        <DashboardPanel title="Low Stock Alerts">
          <div className="space-y-3">
            {analytics.lowStockProducts.length > 0 ? (
              analytics.lowStockProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-red-500/10 border border-red-500/20 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-red-500/20 text-red-300 flex items-center justify-center">
                      <FaBoxOpen />
                    </div>
                    <p className="font-black text-white text-sm">{product.name}</p>
                  </div>
                  <span className="text-red-200 text-xs font-black uppercase tracking-widest">
                    Stock {product.stock}
                  </span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 text-green-100 font-bold">
                Semua produk berada di atas batas minimum stok.
              </div>
            )}
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, tone }) {
  const toneClass = {
    green: "bg-green-500/15 text-green-300",
    blue: "bg-blue-500/15 text-blue-300",
    purple: "bg-purple-500/15 text-purple-300",
    orange: "bg-orange-500/15 text-orange-300",
  };

  return (
    <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${toneClass[tone]}`}>
        {createElement(icon)}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{label}</p>
        <p className="text-white text-lg font-black truncate">{value}</p>
      </div>
    </div>
  );
}

function DashboardPanel({ title, children }) {
  return (
    <section className="bg-[#2D2825]/70 backdrop-blur-xl rounded-[32px] p-6 border border-white/5 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)]">
      <h2 className="text-xl font-black text-white mb-5">{title}</h2>
      {children}
    </section>
  );
}

function HighlightCard({ icon, label, title, description }) {
  return (
    <div className="bg-black/25 border border-white/10 rounded-[24px] p-5">
      <div className="w-12 h-12 rounded-2xl bg-dash-accent/20 text-dash-accent flex items-center justify-center mb-4">
        {createElement(icon)}
      </div>
      <p className="text-[10px] text-white/35 font-black uppercase tracking-widest">{label}</p>
      <p className="text-2xl text-white font-black mt-1">{title}</p>
      <p className="text-sm text-white/45 font-bold mt-1">{description}</p>
    </div>
  );
}

function RankingPanel({ title, items, valueKey, suffix, isCurrency = false }) {
  return (
    <DashboardPanel title={title}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${title}-${item.name}`} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-8 h-8 rounded-xl bg-black/30 text-dash-accent flex items-center justify-center text-xs font-black">
                {index + 1}
              </span>
              <p className="text-white font-bold text-sm truncate">{item.name}</p>
            </div>
            <p className="text-white/70 text-sm font-black shrink-0">
              {isCurrency ? formatRupiahCompact(item[valueKey]) : `${item[valueKey]} ${suffix}`}
            </p>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}
