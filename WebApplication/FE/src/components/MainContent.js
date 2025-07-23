import React from 'react';
import StudentProfile from './StudentProfile';
import ScoreView from './ScoreView';
import ScheduleView from './ScheduleView';
import ImportStudents from './ImportStudents';

function MainContent({ selectedMenu }) {
  if (selectedMenu === 'Hồ sơ cá nhân') {
    return <StudentProfile />;
  }
  if (selectedMenu === 'Xem điểm') {
    return <ScoreView />;
  }
  if (selectedMenu === 'Thiếu khoá biểu') {
    return <ScheduleView />;
  }
  if (selectedMenu === 'Import sinh viên') {
    return <ImportStudents />;
  }
  return (
    <div style={{ marginLeft: 220, marginTop: 56, padding: 32 }}>
      <h2>{selectedMenu}</h2>
      <div style={{ marginTop: 24 }}>
        {/* Nội dung từng menu sẽ bổ sung sau */}
        <p>Đây là nội dung cho menu: <b>{selectedMenu}</b></p>
      </div>
    </div>
  );
}

export default MainContent; 