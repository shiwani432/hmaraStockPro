import { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
  // Isse badal dein:
  const res = await axios.post('https://inventory-backend-shiwani.onrender.com/api/login', { email, password });
      
localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Galti! Sahi credentials dalein.");
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a', // Darker elegant background
    fontFamily: "'Inter', sans-serif",
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '360px', // Thoda chota aur compact width
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    outline: 'none',
    fontSize: '14px',
    boxSizing: 'border-box',
    marginTop: '6px',
    transition: 'all 0.2s',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '24px',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#2563eb', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'white', fontSize: '20px' }}>
            📦
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '0' }}>InventoryPro</h2>
          <p style={{ color: '#64748b', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Admin Login</p>
        </div>

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginLeft: '4px' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              placeholder="admin@test.com"
              style={inputStyle}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginLeft: '4px' }}>PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••"
              style={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Sign In
          </button>
        </form>
        
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#94a3b8' }}>
          Secure Dashboard Access
        </p>
      </div>
    </div>
  );
}