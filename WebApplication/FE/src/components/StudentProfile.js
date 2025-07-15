import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        // Giả định backend có API /api/students/me trả về thông tin sinh viên theo token
        const res = await axios.get('http://localhost:3000/api/students/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(res.data);
      } catch (err) {
        setError('Không lấy được thông tin sinh viên!');
      }
      setLoading(false);
    };
    fetchStudent();
  }, []);

  if (loading) return <div style={{ marginLeft: 220, marginTop: 56, padding: 32 }}>Đang tải...</div>;
  if (error) return <div style={{ marginLeft: 220, marginTop: 56, padding: 32, color: 'red' }}>{error}</div>;
  if (!student) return null;

  return (
    <div style={{ marginLeft: 220, marginTop: 56, padding: 32, display: 'flex', gap: 32 }}>
      {/* Sidebar trái */}
      <div style={{ width: 320 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#e5e7eb', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, color: '#94a3b8' }}>
            <span>👤</span>
          </div>
          <div style={{ fontWeight: 'bold', fontSize: 18 }}>{student.name}</div>
          <div style={{ color: '#64748b', margin: '8px 0' }}>MSSV: {student.studentId}</div>
          <div style={{ color: '#64748b' }}>Chuyên ngành: {student.major?.name || student.major}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, fontSize: 14, color: '#334155' }}>
          <b>Cập nhật gần nhất:</b>
          <div style={{ color: '#64748b', margin: '8px 0' }}>(Chưa có dữ liệu)</div>
          <div style={{ marginTop: 16, color: '#ef4444' }}><b>Lưu ý:</b> Dữ liệu không được phép để trống</div>
        </div>
      </div>
      {/* Form thông tin sinh viên */}
      <div style={{ flex: 1 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 24 }}>
          <h3 style={{ marginBottom: 24 }}>THÔNG TIN SINH VIÊN</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ flex: '1 1 220px' }}>
              <label>Mã sinh viên</label>
              <input value={student.studentId} disabled style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <label>Họ tên</label>
              <input value={student.name} disabled style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <label>Ngày sinh</label>
              <input value={student.dob ? new Date(student.dob).toLocaleDateString() : ''} disabled style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <label>Email</label>
              <input value={student.email} disabled style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <label>Số điện thoại</label>
              <input value={student.phone} disabled style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <label>Quê quán</label>
              <input value={student.hometown} disabled style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }} />
            </div>
            <div style={{ flex: '1 1 220px' }}>
              <label>Chuyên ngành</label>
              <input value={student.major?.name || student.major} disabled style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile; 