import React, { useEffect } from 'react';
import Header from './components/Header';
import MainContent from './teacher/MainContent';

function TeacherHome({ onLogout }) {
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'teacher') {
      onLogout();
    }
  }, [onLogout]);

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <Header onLogout={onLogout} />
      <MainContent />
    </div>
  );
}

export default TeacherHome; 