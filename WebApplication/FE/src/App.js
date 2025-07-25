import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import TeacherHome from './TeacherHome';

function App() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState('login');
  const [userType, setUserType] = useState('student');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (token) {
      if (userType === 'teacher') {
        setPage('teacher');
      } else {
        setPage('home');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL;
      const res = await axios.post(`${apiBase}/api/auth/login`, { studentId, password, userType });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userType', res.data.userType);
      if (res.data.userType === 'teacher' && res.data.teacherId) {
        localStorage.setItem('teacherId', res.data.teacherId);
      } else {
        localStorage.removeItem('teacherId');
      }
      setSuccess('Đăng nhập thành công!');
      setTimeout(() => setPage(res.data.userType === 'teacher' ? 'teacher' : 'home'), 500);
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setPage('login');
    setStudentId('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  if (page === 'teacher') return <TeacherHome onLogout={handleLogout} />;
  if (page === 'home') return <Home onLogout={handleLogout} />;

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            <input type="radio" name="userType" value="student" checked={userType === 'student'} onChange={() => setUserType('student')} /> Sinh viên
          </label>
          <label style={{ marginLeft: 16 }}>
            <input type="radio" name="userType" value="teacher" checked={userType === 'teacher'} onChange={() => setUserType('teacher')} /> Giảng viên
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>{userType === 'student' ? 'Mã sinh viên' : 'Mã giảng viên'}</label>
          <input
            type="text"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Đăng nhập</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 16 }}>{success}</div>}
    </div>
  );
}

export default App; 