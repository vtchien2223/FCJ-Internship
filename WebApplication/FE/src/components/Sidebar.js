import React, { useState } from 'react';

const sidebarMenus = [
  { label: 'Trang chủ' },
  { label: 'Hồ sơ cá nhân' },
  {
    label: 'Học vụ',
    children: [
      { label: 'Thiếu khoá biểu' },
      { label: 'Xem điểm' },
      { label: 'Lịch thi' },
    ],
  },
  { label: 'Import sinh viên' },
  { label: 'Học phí' },
  { label: 'Yêu cầu - Trợ giúp' },
  { label: 'Đánh giá rèn luyện' },
  { label: 'Đoàn - Hội' },
  { label: 'Khảo sát' },
  { label: 'Khác' },
  { label: 'Tài khoản' },
];

function Sidebar({ selectedMenu, onSelectMenu }) {
  const [openMenu, setOpenMenu] = useState(null);
  const handleClick = (item) => {
    if (item.children) {
      setOpenMenu(openMenu === item.label ? null : item.label);
    } else {
      onSelectMenu(item.label);
    }
  };
  return (
    <div style={{ width: 220, background: 'linear-gradient(180deg, #2563eb 0%, #1e40af 100%)', color: '#fff', minHeight: '100vh', padding: '24px 0', position: 'fixed', left: 0, top: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>SINH VIÊN</div>
      </div>
      <nav>
        {sidebarMenus.map((item) => (
          <div key={item.label}>
            <div
              onClick={() => handleClick(item)}
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
              {item.children && (
                <span style={{ marginLeft: 'auto', fontSize: 12 }}>{openMenu === item.label ? '▲' : '▼'}</span>
              )}
            </div>
            {item.children && openMenu === item.label && (
              <div style={{ marginLeft: 16 }}>
                {item.children.map((child) => (
                  <div
                    key={child.label}
                    onClick={() => onSelectMenu(child.label)}
                    style={{
                      padding: '8px 24px',
                      cursor: 'pointer',
                      background: selectedMenu === child.label ? 'rgba(255,255,255,0.12)' : 'none',
                      borderLeft: selectedMenu === child.label ? '4px solid #38bdf8' : '4px solid transparent',
                      fontWeight: selectedMenu === child.label ? 'bold' : 'normal',
                    }}
                  >
                    {child.label}
                  </div>
                ))}
              </div>
            )}
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