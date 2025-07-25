import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScheduleView() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const apiBase = process.env.REACT_APP_API_BASE_URL;
        // Lấy teacherId từ token (giả sử đã lưu userType và teacherId vào localStorage hoặc decode token)
        // Ở đây tạm lấy teacherId từ localStorage, nếu cần decode JWT thì bổ sung thư viện jwt-decode
        const teacherId = localStorage.getItem('teacherId');
        const res = await axios.get(`${apiBase}/api/schedules?teacherId=${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (err) {
        setError('Không thể tải dữ liệu lớp dạy.');
      }
      setLoading(false);
    };
    fetchClasses();
  }, []);

  return (
    <div style={{ marginLeft: 220, marginTop: 56, padding: 32 }}>
      <h2>Lịch dạy của tôi</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', marginTop: 24 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Môn học</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Lớp</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Ngày</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Tiết</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Phòng</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((row, idx) => (
              <tr key={idx}>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.subject?.name}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.class?.classId}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.date ? new Date(row.date).toLocaleDateString('vi-VN') : '-'}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.periodFrom} - {row.periodTo}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.room || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ScheduleView; 