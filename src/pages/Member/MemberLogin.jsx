import { useNavigate } from "react-router-dom";

export default function MemberLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // store a minimal guest member object so MemberDashboard permits access
    const guest = { name: "Guest", customer_id: "GUEST" };
    localStorage.setItem("memberCustomer", JSON.stringify(guest));
    navigate("/member");
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] px-6 py-16 text-[#2D2825]">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-[#1A1614]">Member Login</h1>
          <p className="mt-3 text-[#2D2825]/70">
           80 JT total penjualan 
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block font-bold text-[#1A1614]">Member ID</label>
            <input
              type="text"
              placeholder="CUST0001"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#967259]"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-[#1A1614]">Email</label>
            <input
              type="email"
              placeholder="puspanajmudin386@gmail.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#967259]"
            />
          </div>

          <p className="hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600" />

          <button
            onClick={handleLogin}
            className="w-full bg-[#967259] hover:bg-[#7e5e47] text-white px-5 py-3 rounded-xl font-bold transition-all active:scale-95"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}