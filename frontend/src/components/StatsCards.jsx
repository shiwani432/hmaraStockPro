export default function StatsCards({ totalItems, totalValue, lowStock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Items</p>
        <h3 className="text-2xl font-black text-slate-800">{totalItems}</h3>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-blue-500">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Value</p>
        <h3 className="text-2xl font-black text-blue-600">₹{totalValue.toLocaleString()}</h3>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Low Stock</p>
        <h3 className={`text-2xl font-black ${lowStock > 0 ? 'text-orange-500' : 'text-emerald-500'}`}>{lowStock}</h3>
      </div>
    </div>
  );
}