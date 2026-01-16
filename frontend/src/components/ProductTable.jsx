export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto">
      {/* Table ki width fix kar di hai mobile ke liye */}
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead className="bg-slate-50/50">
          <tr>
            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Info</th>
            <th className="p-5 text-[10px] font-black text-slate-400 uppercase text-center tracking-widest">Price</th>
            <th className="p-5 text-[10px] font-black text-slate-400 uppercase text-center tracking-widest">Stock Level</th>
            <th className="p-5 text-[10px] font-black text-slate-400 uppercase text-right tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.map(p => {
            const qty = Number(p.quantity);
            const percentage = Math.min((qty / 100) * 100, 100);
            
            let barColor = "bg-blue-500";
            let statusText = "IN STOCK";
            let textColor = "text-blue-600";
            let rowBg = "hover:bg-slate-50/50";

            if (qty <= 0) {
              barColor = "bg-rose-500";
              statusText = "OUT OF STOCK";
              textColor = "text-rose-500";
              rowBg = "bg-rose-50/50 hover:bg-rose-50";
            } else if (qty < 5) {
              barColor = "bg-orange-500";
              statusText = "LOW STOCK";
              textColor = "text-orange-600";
              rowBg = "bg-orange-50/50 hover:bg-orange-50";
            }

            return (
              <tr key={p.id} className={`${rowBg} transition-all group`}>
                <td className="p-5">
                  <p className="font-bold text-slate-700 text-sm capitalize">{p.name}</p>
                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-[9px] text-slate-400 font-bold">SKU-{1000 + p.id}</span>
                    <span className="text-[8px] bg-white/50 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-black uppercase">
                      {p.category || 'General'}
                    </span>
                  </div>
                </td>
                <td className="p-5 text-center font-bold text-slate-600 text-sm">₹{p.price}</td>
                <td className="p-5">
                  <div className="w-40 mx-auto">
                    <div className="flex justify-between mb-1.5 items-center">
                      <span className={`text-[9px] font-black uppercase ${textColor}`}>{statusText}</span>
                      <span className="text-[10px] font-bold text-slate-400">{qty}/100</span>
                    </div>
                    <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-4 md:gap-6 items-center">
                    <button onClick={() => onEdit(p)} className="text-blue-600 font-black text-[10px] uppercase">Edit</button>
                    <button onClick={() => onDelete(p.id)} className="text-lg">🗑️</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}