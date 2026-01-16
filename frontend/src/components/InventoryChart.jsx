import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3B82F6', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4'];

export default function InventoryChart({ products }) {
  const data = products
    .filter(p => p.quantity > 0)
    .slice(0, 20) 
    .map(p => ({
      name: p.name,
      value: Number(p.quantity)
    }));

  return (
    // 'border' class ko yahan se hata diya gaya hai
    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm flex flex-col animate-in fade-in duration-700">
      
      <div className="mb-10 text-center">
        <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">
          Stock Distribution
        </h3>
        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">
          Inventory Visualization
        </p>
      </div>
      
      {/* Chart container se bhi black border (outline) hata di hai */}
      <div className="w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height={450}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={90} 
              outerRadius={140}
              paddingAngle={5}
              dataKey="value"
              stroke="none" // Pie segments ki lines bhi hata di
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="outline-none border-none" 
                />
              ))}
            </Pie>
            
            <Tooltip 
              contentStyle={{ 
                borderRadius: '20px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
              }}
            />
            
            <Legend 
              verticalAlign="bottom" 
              iconType="circle"
              formatter={(value) => (
                <span className="text-[10px] font-bold text-slate-500 uppercase ml-2">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}