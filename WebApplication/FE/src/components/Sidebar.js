import React from 'react';

const sidebarMenus = [
  'Trang chủ',
  'Hồ sơ cá nhân',
  'Học vụ',
  'Học phí',
  'Yêu cầu - Trợ giúp',
  'Đánh giá rèn luyện',
  'Đoàn - Hội',
  'Khảo sát',
  'Khác',
  'Tài khoản',
];

function Sidebar({ selectedMenu, onSelectMenu }) {
  return (
    <div style={{ width: 220, background: 'linear-gradient(180deg, #2563eb 0%, #1e40af 100%)', color: '#fff', minHeight: '100vh', padding: '24px 0', position: 'fixed', left: 0, top: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>SINH VIÊN</div>
      </div>
      <nav>
        {sidebarMenus.map((label, idx) => (
          <div
            key={label}
            onClick={() => onSelectMenu(label)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 32px',
              cursor: 'pointer',
              background: selectedMenu === label ? 'rgba(255,255,255,0.08)' : 'none',
              borderLeft: selectedMenu === label ? '4px solid #38bdf8' : '4px solid transparent',
              fontWeight: selectedMenu === label ? 'bold' : 'normal',
            }}
          >
            <span>{label}</span>
          </div>
        ))}
      </nav>
      <div style={{ position: 'absolute', bottom: 24, left: 0, width: '100%', textAlign: 'center', fontSize: 12, color: '#cbd5e1' }}>
        HUTECH © 2012 - 2025
      </div>
    </div>
  );
}

export default Sidebar; 