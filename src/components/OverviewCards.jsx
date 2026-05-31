import { FaWallet, FaShoppingCart, FaUserFriends, FaFire } from 'react-icons/fa';

export default function OverviewCards({ stats }) {
  const s = stats || {
    sales: 'Rp 4.250.000',
    orders: '800 Order',
    members: '12 Member',
    top: 'Machiato',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
        <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center text-xl">
          <FaWallet />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Sales</p>
          <p className="text-white text-lg font-black">{s.sales}</p>
        </div>
      </div>

      <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-xl">
          <FaShoppingCart />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Orders</p>
          <p className="text-white text-lg font-black">{s.orders}</p>
        </div>
      </div>

      <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
        <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center text-xl">
          <FaUserFriends />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">New Members</p>
          <p className="text-white text-lg font-black">{s.members}</p>
        </div>
      </div>

      <div className="bg-[#2D2825] p-5 rounded-[28px] border border-white/5 flex items-center gap-4 shadow-xl">
        <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center text-xl">
          <FaFire />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Best Seller</p>
          <p className="text-white text-lg font-black">{s.top}</p>
        </div>
      </div>
    </div>
  );
}
