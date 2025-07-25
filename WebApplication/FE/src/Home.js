import React, { useState } from 'react';
import { Sidebar, MainContent } from './student';
import Header from './components/Header';

function Home({ onLogout }) {
  const [selectedMenu, setSelectedMenu] = useState('Trang chủ');

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <Sidebar selectedMenu={selectedMenu} onSelectMenu={setSelectedMenu} />
      <Header onLogout={onLogout} />
      <MainContent selectedMenu={selectedMenu} />
    </div>
  );
}

export default Home; 