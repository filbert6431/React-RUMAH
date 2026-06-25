import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ordersData = [
  {
    order_id: "ORD-1001",
    order_date: "2026-06-01",
    status: "Completed",
    total: 75000,
    customer_id: "GUEST",
    items: [
      { name: "Espresso", qty: 1 },
      { name: "Cappuccino", qty: 2 }
    ]
  },
  {
    order_id: "ORD-1002",
    order_date: "2026-06-05",
    status: "Completed",
    total: 45000,
    customer_id: "OTHER",
    items: [
      { name: "Latte", qty: 1 }
    ]
  }
];

const promoData = [
  {
    promo_id: "P1",
    nama_promo: "Rabu Spesial",
    discount: 20,
    claim_count: 5,
    claim_limit: 100,
    status_promo: "Active"
  }
];

const reviewsData = [
  {
    review_id: "R1",
    customer_id: "GUEST",
    star_review: 5,
    review_text: "Great coffee and cozy place!"
  }
];

import Button from "../../components/Guest/Button";
import RatingStars from "../../components/Guest/RatingStar";
import ReviewForm from "../../components/Guest/Review";

const tabs = ["General", "My History", "Promo", "Review", "Logout"];

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
};

const getFavoriteProduct = (orders) => {
  const productCount = {};

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      productCount[item.name] = (productCount[item.name] || 0) + item.qty;
    });
  });

  const favorite = Object.entries(productCount).sort((a, b) => b[1] - a[1])[0];

  return {
    name: favorite ? favorite[0] : "No product yet",
    totalOrders: favorite ? favorite[1] : 0,
  };
};

// Fake customer data
const FAKE_CUSTOMER = {
  customer_id: "MBR-20240819",
  name: "Andi Prasetyo",
  Email: "andi.prasetyo@email.com",
  Nomor_HP: "+62 812-3456-7890",
  Jenis_Kelamin: "Male",
  Tanggal_Lahir: "1995-08-19",
  tanggal_daftar: "2024-01-15",
  status_member: "Active",
  Foto_Profil: "https://i.pravatar.cc/150?img=12",
};

export default function MemberDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("General");
  const [customer, setCustomer] = useState(FAKE_CUSTOMER);

  useEffect(() => {
    const savedCustomer = localStorage.getItem("memberCustomer");

    if (!savedCustomer) {
      // Use fake customer instead of redirecting
      queueMicrotask(() => setCustomer(FAKE_CUSTOMER));
      return;
    }

    const parsed = JSON.parse(savedCustomer);
    queueMicrotask(() => setCustomer(parsed));
  }, [navigate]);

  const memberOrders = useMemo(() => {
    if (!customer) return [];
    return ordersData.filter((order) => order.customer_id === customer.customer_id);
  }, [customer]);

  const memberReviews = useMemo(() => {
    if (!customer) return [];
    return reviewsData.filter((review) => review.customer_id === customer.customer_id);
  }, [customer]);

  const totalOrders = memberOrders.length;
  const totalSpending = memberOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrder = totalOrders ? totalSpending / totalOrders : 0;
  const favoriteProduct = getFavoriteProduct(memberOrders);

  const DUMMY_POINTS = 1200;
  const DUMMY_POINT_TARGET = 2000;
  const DUMMY_FAVORITE = { name: "Cappuccino", totalOrders: 5 };
  const DUMMY_TOTAL_SPENDING = 80000000;

  const pointTarget = DUMMY_POINT_TARGET;
  const points = DUMMY_POINTS;
  const favoriteProductDisplay = DUMMY_FAVORITE;
  const progressWidth = `${Math.min((points / pointTarget) * 100, 100)}%`;

  const handleLogout = () => {
    localStorage.removeItem("memberCustomer");
    navigate("/");
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#F4EFEA] p-6 text-[#2D2825]">
        Loading member dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#2D2825]">
      {/* Dashboard Header */}
      <header className="bg-[#1A1614] px-6 py-10 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-widest text-[#967259]">
            Member Portal
          </p>
          <h1 className="mt-3 text-4xl font-black">
            Welcome, {customer.name}
          </h1>
          <p className="mt-3 text-white/70">
            Manage your membership, history, promos, and reviews.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-5 py-3 font-bold transition ${
                activeTab === tab
                  ? "bg-[#967259] text-white"
                  : "bg-white text-[#2D2825] hover:bg-[#e5ddd5]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === "General" && (
          <section className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <img
                  src={customer.Foto_Profil}
                  alt={customer.name}
                  className="h-28 w-28 rounded-full object-cover"
                />
                <h2 className="mt-5 text-2xl font-black text-[#1A1614]">
                  {customer.name}
                </h2>
                <p className="font-bold capitalize text-[#967259]">
                  Gold Member
                </p>
                <p className="mt-2 text-sm text-[#2D2825]/70">
                  Status: {customer.status_member}
                </p>
                <p className="mt-4 text-3xl font-black text-[#1A1614]">
                  {points} Points
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-md lg:col-span-2">
                <h2 className="text-2xl font-black text-[#1A1614]">
                  Personal Information
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Info label="Email" value="andi.prasetyo@email.com" />
                  <Info label="Phone Number" value="+62 812-3456-7890" />
                  <Info label="Gender" value="Male" />
                  <Info label="Birth Date" value="1995-08-19" />
                  <Info label="Registration Date" value="2024-01-15" />
                  <Info label="Member ID" value="MBR-20240819" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <KpiCard title="Total Transactions" value={"80 JUTA"} />
              <KpiCard title="Total Spending" value={formatRupiah(DUMMY_TOTAL_SPENDING)} />
              <KpiCard title="Points" value={points} />
              <KpiCard title="Favorite Product" value={favoriteProductDisplay.name} />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">
              <div className="flex flex-col justify-between gap-3 md:flex-row">
                <div>
                  <h2 className="text-2xl font-black capitalize text-[#1A1614]">
                    Gold Member
                  </h2>
                  <p className="mt-1 font-bold text-[#967259]">
                    {points} / {pointTarget} Points
                  </p>
                </div>
                <div className="font-bold text-[#2D2825]/70">
                  Favorite Product: {favoriteProductDisplay.name} ({favoriteProductDisplay.totalOrders})
                </div>
              </div>
              <div className="mt-5 h-4 overflow-hidden rounded-full bg-[#F4EFEA]">
                <div
                  className="h-full rounded-full bg-[#967259]"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </section>
        )}

        {/* My History Tab */}
        {activeTab === "My History" && (
          <section className="space-y-8">
            <div className="grid gap-6 md:grid-cols-4">
              <KpiCard title="Total Orders" value={totalOrders} />
              <KpiCard title="Total Spending" value={formatRupiah(totalSpending)} />
              <KpiCard title="Average Order Value" value={formatRupiah(averageOrder)} />
              <KpiCard title="Favorite Product" value={favoriteProduct.name} />
            </div>

            <div className="overflow-x-auto rounded-3xl bg-white shadow-md">
              <table className="w-full min-w-[720px] text-left">
                <thead className="bg-[#1A1614] text-white">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Order Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Number of Items</th>
                  </tr>
                </thead>
                <tbody>
                  {memberOrders.map((order) => (
                    <tr key={order.order_id} className="border-b last:border-b-0">
                      <td className="p-4 font-bold">{order.order_id}</td>
                      <td className="p-4">{order.order_date}</td>
                      <td className="p-4">{order.status}</td>
                      <td className="p-4">{formatRupiah(order.total)}</td>
                      <td className="p-4">
                        {order.items.reduce((sum, item) => sum + item.qty, 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Promo Tab */}
        {activeTab === "Promo" && (
          <section className="grid gap-6 md:grid-cols-3">
            {promoData.map((promo) => (
              <div key={promo.promo_id} className="rounded-3xl bg-white p-6 shadow-md">
                <p className="font-bold uppercase tracking-widest text-[#967259]">
                  {promo.discount}% Discount
                </p>
                <h2 className="mt-3 text-2xl font-black text-[#1A1614]">
                  {promo.nama_promo}
                </h2>
                <p className="mt-3 text-[#2D2825]/70">
                  Claimed {promo.claim_count}/{promo.claim_limit}
                </p>
                <p className="mt-2 font-bold text-[#2D2825]">
                  Status: {promo.status_promo}
                </p>
                <Button className="mt-6" onClick={() => {}}>
                  Claim Promo
                </Button>
              </div>
            ))}
          </section>
        )}

        {/* Review Tab */}
        {activeTab === "Review" && (
          <section className="grid gap-8 lg:grid-cols-2">
            <ReviewForm />

            <div className="rounded-3xl bg-white p-6 shadow-md">
              <h2 className="text-2xl font-black text-[#1A1614]">
                Previous Reviews
              </h2>
              <div className="mt-6 space-y-5">
                {memberReviews.map((review) => (
                  <div key={review.review_id} className="border-b pb-5 last:border-b-0">
                    <RatingStars rating={review.star_review} setRating={() => {}} />
                    <p className="mt-3 leading-7 text-[#2D2825]/75">
                      "{review.review_text}"
                    </p>
                  </div>
                ))}

                {memberReviews.length === 0 && (
                  <p className="text-[#2D2825]/70">No reviews yet.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Logout Tab */}
        {activeTab === "Logout" && (
          <section className="rounded-3xl bg-white p-8 text-center shadow-md">
            <h2 className="text-3xl font-black text-[#1A1614]">
              Logout Member Account
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#2D2825]/70">
              This will remove your member data from this browser and return you
              to the guest home page.
            </p>
            <Button className="mt-8" onClick={handleLogout}>
              Logout
            </Button>
          </section>
        )}
      </main>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm font-bold text-[#967259]">{label}</p>
      <p className="mt-1 font-bold text-[#1A1614]">{value || "-"}</p>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <p className="text-sm font-bold uppercase tracking-widest text-[#967259]">
        {title}
      </p>
      <p className="mt-3 text-2xl font-black text-[#1A1614]">{value}</p>
    </div>
  );
}