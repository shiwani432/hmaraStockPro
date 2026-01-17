import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function CategoryPage({ categories, onRefresh }) {
  const [name, setName] = useState('');
  const BASE_URL = 'https://inventory-backend-shiwani.onrender.com/api/categories';
  
  // Token ko localStorage se lena zaroori hai authentication ke liye
  const token = localStorage.getItem('token');
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    onRefresh(); 
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      // Yahan bhi authConfig add kiya hai security ke liye
      const res = await axios.post(`${BASE_URL}/add`, { name: name.trim() }, authConfig);
      if (res.status === 201 || res.status === 200) {
        toast.success('Category added successfully!');
        setName('');
        onRefresh(); 
      }
    } catch (err) {
      console.error("Add Error:", err);
      toast.error(err.response?.data?.message || "Failed to add category");
    }
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      // Backend /api/categories/:id accept karta hai delete ke liye
      await axios.delete(`${BASE_URL}/${id}`, authConfig);
      toast.success('Category removed successfully!');
      onRefresh(); 
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6 p-2">
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

      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Existing Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <div key={cat.id} className="group relative bg-slate-50 p-4 rounded-2xl text-center font-bold text-slate-700 border border-slate-100 capitalize flex items-center justify-center gap-2">
                <span className="text-blue-500">📁</span> {cat.name}
                <button 
                  onClick={() => handleDelete(cat.id)} 
                  className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-all shadow-lg flex items-center justify-center hover:bg-rose-600 active:scale-90"
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