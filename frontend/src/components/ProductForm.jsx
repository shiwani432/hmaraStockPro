export default function ProductForm({ form, setForm, onSubmit, editingId, setEditingId, categories }) {
  // Ab hum local list nahi, balki prop se aane wali 'categories' list use karenge

  return (
    <div className="w-full p-2 md:p-0">
      <h3 className="text-[11px] font-black text-slate-800 uppercase mb-6 border-b border-slate-50 pb-4">
        {editingId ? 'Modify Item' : 'New Entry'}
      </h3>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Product Name</label>
          <input 
            className="w-full bg-slate-50 p-3 rounded-xl text-sm border-none outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 transition-all" 
            placeholder="e.g. Wireless Mouse" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
            required 
          />
        </div>
        
        {/* Responsive Grid: Mobile pe 1 column, PC pe 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Price (₹)</label>
            <input 
              className="w-full bg-slate-50 p-3 rounded-xl text-sm border-none outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 transition-all" 
              type="number" min="0" value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Category</label>
            <div className="relative">
              <select 
                className={`w-full bg-slate-50 p-3 rounded-xl text-sm border-none outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 transition-all appearance-none ${!form.category ? 'text-slate-400' : 'text-slate-900'}`}
                value={form.category} 
                onChange={e => setForm({...form, category: e.target.value})} 
                required
              >
                <option value="" disabled hidden>Select Category</option>
                {/* Yahan hum Sidebar wali categories map kar rahe hain */}
                {categories && categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
              {/* Dropdown Arrow Icon */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Quantity</label>
            <input 
              className="w-full bg-slate-50 p-3 rounded-xl text-sm border-none outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 transition-all" 
              type="number" min="0" value={form.quantity} 
              onChange={e => setForm({...form, quantity: e.target.value})} required 
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
          {editingId ? 'Update Stock' : 'Save To Inventory'}
        </button>

        {editingId && (
          <button 
            type="button" 
            onClick={() => {
              setEditingId(null);
              setForm({ name: '', price: '', quantity: '', category: '' });
            }}
            className="w-full mt-2 text-slate-400 text-[10px] font-bold uppercase hover:text-slate-600"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}