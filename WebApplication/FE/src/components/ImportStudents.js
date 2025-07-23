import React, { useState, useEffect } from 'react';

function ImportStudents() {
  const [file, setFile] = useState(null);
  const [year, setYear] = useState('');
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy danh sách ngành học từ API
  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiBase}/api/majors`)
      .then(res => res.json())
      .then(data => setMajors(data))
      .catch(() => setMajors([]));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !year || !selectedMajor) {
      setMessage('Vui lòng nhập đủ thông tin và chọn file.');
      return;
    }
    setLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('year', year);
    formData.append('mongoMajorObjectId', selectedMajor);
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL;
      const res = await fetch(`${apiBase}/api/students/upload-xlsx`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Thành công: ${data.message}`);
      } else {
        setMessage(`Lỗi: ${data.error || 'Import thất bại'}`);
      }
    } catch (err) {
      setMessage('Lỗi kết nối server.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2>Import danh sách sinh viên từ Excel</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Năm học:</label><br />
          <input type="text" value={year} onChange={e => setYear(e.target.value)} placeholder="VD: 2025" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Ngành học:</label><br />
          <select value={selectedMajor} onChange={e => setSelectedMajor(e.target.value)} required style={{ width: '100%', padding: 8 }}>
            <option value="">-- Chọn ngành --</option>
            {majors.map(m => (
              <option key={m._id} value={m._id}>{m.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>File Excel (.xlsx):</label><br />
          <input type="file" accept=".xlsx" onChange={handleFileChange} required />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
          {loading ? 'Đang import...' : 'Import'}
        </button>
      </form>
      {message && <div style={{ marginTop: 16, color: message.startsWith('Thành công') ? 'green' : 'red' }}>{message}</div>}
    </div>
  );
}

export default ImportStudents;
