import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function CategoryPage({ categories, onRefresh }) {
  const [name, setName] = useState('');

  // Refresh categories when the page loads
  useEffect(() => {
    onRefresh();
  }, []);

  // Add Category Function
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
     const res = await axios.post('https://inventory-backend-shiwani.onrender.com/api/categories/add', { name: name.trim() });
      if (res.status === 201 || res.status === 200) {
        toast.success('Category added successfully!');
        setName('');
        onRefresh(); // Refresh the list
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add category");
    }
  };

  // Delete Category Function
  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid Category ID");
      return;
    }
    
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      // Make sure the URL matches your backend route
      await axios.delete(`https://inventory-backend-shiwani.onrender.com/api/categories/${id}`);
      toast.success('Category removed successfully!');
      onRefresh(); // Update the UI
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category. Check backend connection.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6 p-2">
      {/* Input Section */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Create New Category</h3>
        <form onSubmit={handleAdd} className="flex gap-4">
          <input 
            className="flex-1 bg-slate-50 p-4 rounded-2xl text-sm outline-none border-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Enter Category Name (e.g. Bag, Shoes)..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-8 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95">
            + Add
          </button>
        </form>
      </div>

      {/* List Section */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Existing Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <div 
                key={cat.id} // Database ID use karna best hai index ki jagah
                className="group relative bg-slate-50 p-4 rounded-2xl text-center font-bold text-slate-700 border border-slate-100 capitalize flex items-center justify-center gap-2"
              >
                <span className="text-blue-500">📁</span> {cat.name}
                
                {/* --- DELETE BUTTON --- */}
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-all shadow-lg flex items-center justify-center hover:bg-rose-600 active:scale-90"
                  title="Remove Category"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-xs italic col-span-full text-center py-4">No categories found. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}