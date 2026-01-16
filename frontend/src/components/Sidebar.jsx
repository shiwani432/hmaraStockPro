import { useState, useEffect } from 'react';

export default function Sidebar({ onDownload, setActiveTab, activeTab, isOpen, setIsOpen, onLogout }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-slate-400 flex flex-col z-50 transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="bg-blue-600 p-1.5 rounded-lg text-white text-sm">📦</span> StockPro
          </h1>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-white text-2xl">×</button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
          {/* Dashboard Button */}
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsOpen(false); }}
            className={`w-full p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <span className="text-sm font-bold">🏠 Dashboard</span>
          </button>

          {/* Analytics Button */}
          <button 
            onClick={() => { setActiveTab('analytics'); setIsOpen(false); }}
            className={`w-full p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
              activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <span className="text-sm font-bold">📈 Analytics</span>
          </button>

          {/* Manage Categories Button (Naya Page Button) */}
          <button 
            onClick={() => { setActiveTab('categories'); setIsOpen(false); }}
            className={`w-full p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
              activeTab === 'categories' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <span className="text-sm font-bold">📁 Categories</span>
          </button>
        </nav>

        <div className="p-6 space-y-3 border-t border-slate-800/50">
          <button 
            onClick={onDownload} 
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-slate-700"
          >
            📥 Download Report
          </button>
          <button 
            onClick={onLogout}
            className="w-full text-rose-400 hover:text-rose-500 text-[10px] font-bold uppercase py-2 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}