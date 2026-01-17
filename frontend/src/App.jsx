import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'; 
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import StatsCards from './components/StatsCards';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import InventoryChart from './components/InventoryChart';
import CategoryPage from './components/CategoryPage'; 

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', price: '', quantity: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const authConfig = { headers: { Authorization: `Bearer ${token}` } };
  const BASE_URL = 'https://inventory-backend-shiwani.onrender.com/api';

  const fetchData = async () => {
    if (!token) return;
    try {
      // Dono data (Products aur Categories) ko ek saath fetch kar rahe hain
      const [prodRes, catRes] = await Promise.all([
        axios.get(`${BASE_URL}/products`, authConfig),
        axios.get(`${BASE_URL}/categories`) // Spelling categories (plural) sahi ki
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) { 
      if (err.response?.status === 401) logout(); 
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { fetchData(); }, [token, sidebarOpen]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/update/${editingId}`, form, authConfig);
        toast.success('Product updated!'); 
        setEditingId(null);
      } else {
        await axios.post(`${BASE_URL}/add`, form, authConfig);
        toast.success('Added to inventory!'); 
      }
      setForm({ name: '', price: '', quantity: '', category: '' });
      fetchData();
    } catch (err) { toast.error("Failed to save!"); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Khatam kar dein is item ko?")) return;
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`, authConfig);
      toast.success('Item removed.'); 
      fetchData();
    } catch (err) { toast.error("Delete failed!"); }
  };

  const handleDownload = () => {
    const headers = ["Name,Price,Quantity\n"];
    const rows = products.map(p => `${p.name},${p.price},${p.quantity}\n`);
    const blob = new Blob([headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'Report.csv'; a.click();
  };

  const logout = () => { localStorage.removeItem('token'); setToken(null); };

  if (!token) return <Login setToken={setToken} />;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Toaster position="top-right" /> 
      <Sidebar onDownload={handleDownload} onLogout={logout} setActiveTab={setActiveTab} activeTab={activeTab} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 lg:ml-64 min-h-screen p-4 md:p-8 w-full overflow-x-hidden">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center w-full md:w-auto">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-white shadow-sm rounded-xl text-2xl mr-4 text-slate-600 border border-slate-100">☰</button>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 capitalize tracking-tight">{activeTab}</h2>
          </div>
          {activeTab === 'dashboard' && (
            <input type="text" placeholder="Search..." className="bg-white shadow-sm px-6 py-3 rounded-2xl text-sm w-full md:w-72 outline-none" onChange={(e) => setSearch(e.target.value)} />
          )}
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <StatsCards totalItems={products.length} totalValue={products.reduce((sum, p) => sum + (p.price * p.quantity), 0)} lowStock={products.filter(p => p.quantity < 5).length} />
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm">
                  <ProductForm form={form} setForm={setForm} onSubmit={handleSubmit} editingId={editingId} setEditingId={setEditingId} categories={categories} />
                </div>
                <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm flex flex-col min-h-[400px]">
                    <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6">Recent Activity</h3>
                    <div className="space-y-6 overflow-y-auto max-h-[350px] pr-2 scrollbar-hide">
                        {products.length > 0 ? ([...products].reverse().slice(0, 8).map((p, idx) => (
                            <div key={idx} className="relative pl-6 pb-2 border-l border-slate-100 last:border-0">
                                <div className="absolute left-[-4.5px] top-1 w-2 h-2 rounded-full bg-blue-500"></div>
                                <p className="text-[11px] text-slate-600 font-medium">Product <span className="font-bold text-slate-900">{p.name}</span> in <span className="text-blue-600">{p.category}</span> added.</p>
                            </div>
                        ))) : <p className="text-[10px] opacity-20">No Activity</p>}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border-none">
              <ProductTable products={filteredProducts} onEdit={(p) => {setEditingId(p.id); setForm(p)}} onDelete={handleDelete} />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="h-[600px] animate-in slide-in-from-bottom duration-700">
            <InventoryChart products={products} />
          </div>
        )}

        {activeTab === 'categories' && (
          <CategoryPage categories={categories} onRefresh={fetchData} />
        )}
      </main>
    </div>
  );
}
export default App;