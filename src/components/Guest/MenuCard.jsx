import { FaShoppingBag } from "react-icons/fa";

export default function CoffeeCard({ item }) {
  return (
    <div className="bg-white p-5 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center border border-gray-100">
      {/* Image Container */}
      <div className="w-full h-64 rounded-[24px] overflow-hidden mb-6 relative">
        <img 
          src={item.img} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="text-center space-y-2">
        <h3 className="font-black text-lg tracking-wide text-[#2D2825]">{item.name}</h3>
        {item.description && (
          <p className="text-sm leading-6 text-gray-500">{item.description}</p>
        )}
        <div className="flex justify-center gap-3 text-sm font-bold">
          <span className="text-gray-400 line-through">{item.oldPrice}</span>
          <span className="text-amber-700">{item.price}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6 opacity-80 group-hover:opacity-100 transition-opacity">
        <button className="p-3 bg-[#F4EFEA] hover:bg-[#967259] hover:text-white rounded-xl text-gray-600 transition-colors shadow-sm">
          <FaShoppingBag />
        </button>
        <button className="p-3 bg-[#F4EFEA] hover:bg-[#967259] hover:text-white rounded-xl text-gray-600 transition-colors shadow-sm text-xs font-bold px-4">
          View Details
        </button>
      </div>
    </div>
  );
}
