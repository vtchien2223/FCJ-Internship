import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScoreView() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const apiBase = process.env.REACT_APP_API_BASE_URL;
        const res = await axios.get(`${apiBase}/api/subjects/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScores(res.data);
      } catch (err) {
        setError('Không thể tải dữ liệu điểm.');
      }
      setLoading(false);
    };
    fetchScores();
  }, []);

  return (
    <div style={{ marginLeft: 220, marginTop: 56, padding: 32 }}>
      <h2>Xem điểm</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', marginTop: 24 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Lớp</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Môn học</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Chuyên cần</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Kiểm tra</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Tổng</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>GPA (4.0)</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((row, idx) => (
              <tr key={idx}>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.classId}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.subject?.name}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.score?.attendance ?? '-'}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.score?.test ?? '-'}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.score?.total ?? '-'}</td>
                <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.score?.gpa4 ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ScoreView; 