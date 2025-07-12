import React from 'react';

function Header({ onLogout }) {
  return (
    <div style={{ height: 56, background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 32px', marginLeft: 220 }}>
      <span style={{ fontSize: 20, margin: '0 16px', cursor: 'pointer' }}>🔔</span>
      <span style={{ fontSize: 20, margin: '0 16px', cursor: 'pointer' }}>⚙️</span>
      <span style={{ fontSize: 20, margin: '0 16px', cursor: 'pointer' }}>👤</span>
      <button onClick={onLogout} style={{ marginLeft: 24, padding: '6px 16px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' }}>Đăng xuất</button>
    </div>
  );
}

export default Header; 