import React, { useState } from 'react';
import ScheduleView from './ScheduleView';

const sidebarMenus = [
  { label: 'Trang chủ' },
  { label: 'Lịch dạy' },
  // Có thể bổ sung các menu khác cho giáo viên
];

function MainContent() {
  const [selectedMenu, setSelectedMenu] = useState('Trang chủ');

  let content = null;
  if (selectedMenu === 'Lịch dạy') {
    content = <ScheduleView />;
  } else {
    content = (
      <div style={{ marginLeft: 220, marginTop: 56, padding: 32 }}>
        <h2>{selectedMenu}</h2>
        <p>Đây là nội dung cho menu: <b>{selectedMenu}</b></p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <div style={{ width: 220, background: 'linear-gradient(180deg, #2563eb 0%, #1e40af 100%)', color: '#fff', minHeight: '100vh', padding: '24px 0', position: 'fixed', left: 0, top: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontWeight: 'bold', fontSize: 18 }}>GIẢNG VIÊN</div>
        </div>
        <nav>
          {sidebarMenus.map((item) => (
            <div
              key={item.label}
              onClick={() => setSelectedMenu(item.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 32px',
                cursor: 'pointer',
                background: selectedMenu === item.label ? 'rgba(255,255,255,0.08)' : 'none',
                borderLeft: selectedMenu === item.label ? '4px solid #38bdf8' : '4px solid transparent',
                fontWeight: selectedMenu === item.label ? 'bold' : 'normal',
              }}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={{ position: 'absolute', bottom: 24, left: 0, width: '100%', textAlign: 'center', fontSize: 12, color: '#cbd5e1' }}>
          HUTECH © 2012 - 2025
        </div>
      </div>
      {content}
    </div>
  );
}

export default MainContent; 