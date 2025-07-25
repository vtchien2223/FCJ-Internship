import React, { useEffect, useState } from 'react';
import axios from 'axios';

const weekdayMap = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
const periods = Array.from({ length: 15 }, (_, i) => i + 1);

function getWeeksInSemester(startDate, endDate) {
  const weeks = [];
  let current = new Date(startDate);
  current.setHours(0, 0, 0, 0);
  if (current.getDay() !== 1) {
    current.setDate(current.getDate() - (current.getDay() === 0 ? 6 : current.getDay() - 1));
  }
  let weekIdx = 0;
  while (current <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(current);
      d.setDate(current.getDate() + i);
      week.push(new Date(d));
    }
    weeks.push(week);
    current.setDate(current.getDate() + 7);
    weekIdx++;
  }
  return weeks;
}

function ScheduleView() {
  const [schedules, setSchedules] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [weeks, setWeeks] = useState([]);
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const apiBase = process.env.REACT_APP_API_BASE_URL;
        const res = await axios.get(`${apiBase}/api/semesters`);
        setSemesters(res.data);
        if (res.data.length > 0) setSelectedSemester(res.data[0]._id);
      } catch (err) {
        setError('Không thể tải danh sách kỳ học.');
      }
    };
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (!selectedSemester) return;
    const fetchSchedules = async () => {
      setLoading(true);
      setError('');
      try {
        const apiBase = process.env.REACT_APP_API_BASE_URL;
        const res = await axios.get(`${apiBase}/api/schedules`);
        setSchedules(res.data.filter(s => s.semester?._id === selectedSemester));
        const semester = semesters.find(s => s._id === selectedSemester);
        if (semester) {
          const start = new Date(semester.startDate);
          const end = new Date(semester.endDate);
          const weeksArr = getWeeksInSemester(start, end);
          setWeeks(weeksArr);
          setSelectedWeekIdx(0);
        }
      } catch (err) {
        setError('Không thể tải dữ liệu thời khoá biểu.');
      }
      setLoading(false);
    };
    fetchSchedules();
    // eslint-disable-next-line
  }, [selectedSemester, semesters]);

  const handlePrevWeek = () => setSelectedWeekIdx(idx => Math.max(0, idx - 1));
  const handleNextWeek = () => setSelectedWeekIdx(idx => Math.min(weeks.length - 1, idx + 1));

  const week = weeks[selectedWeekIdx] || [];
  const weekSchedules = schedules.filter(sch => {
    const d = new Date(sch.date);
    return week.some(wd => wd.toDateString() === d.toDateString());
  });

  // Chuẩn bị dữ liệu gộp cell: { [weekday]: { [period]: { sch, rowspan, show } } }
  const grid = {};
  for (let i = 1; i <= 7; i++) grid[i] = {};
  periods.forEach(p => { for (let i = 1; i <= 7; i++) grid[i][p] = null; });
  weekSchedules.forEach(sch => {
    const d = new Date(sch.date);
    const weekday = d.getDay() === 0 ? 7 : d.getDay();
    // Gộp cell: chỉ render ở periodFrom, các period tiếp theo set show=false
    grid[weekday][sch.periodFrom] = { sch, rowspan: sch.periodTo - sch.periodFrom + 1, show: true };
    for (let p = sch.periodFrom + 1; p <= sch.periodTo; p++) {
      grid[weekday][p] = { sch, rowspan: 0, show: false };
    }
  });

  return (
    <div style={{ marginLeft: 220, marginTop: 56, padding: 32 }}>
      <h2>Thời khoá biểu</h2>
      <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <label>Chọn kỳ học: </label>
        <select value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)} style={{ padding: 8, minWidth: 200 }}>
          {semesters.map(sem => (
            <option key={sem._id} value={sem._id}>{sem.name}</option>
          ))}
        </select>
        {weeks.length > 0 && (
          <>
            <button onClick={handlePrevWeek} disabled={selectedWeekIdx === 0}>◀</button>
            <span>Tuần: {week.length > 0 && `${week[0].toLocaleDateString('vi-VN')} - ${week[6].toLocaleDateString('vi-VN')}`}</span>
            <button onClick={handleNextWeek} disabled={selectedWeekIdx === weeks.length - 1}>▶</button>
          </>
        )}
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', marginTop: 24 }}>
          <table style={{ minWidth: 1100, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ background: '#2563eb', color: '#fff', padding: 8, border: '1px solid #e5e7eb', minWidth: 70 }}> </th>
                {week.map((d, idx) => (
                  <th key={idx} style={{ background: '#2563eb', color: '#fff', padding: 8, border: '1px solid #e5e7eb', minWidth: 120, textAlign: 'center' }}>
                    {weekdayMap[(idx + 1) % 7] || 'Chủ nhật'}<br />
                    {d.toLocaleDateString('vi-VN')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(period => (
                <tr key={period}>
                  <td style={{ background: '#2563eb', color: '#fff', padding: 8, border: '1px solid #e5e7eb', textAlign: 'center' }}>Tiết {period}</td>
                  {week.map((d, colIdx) => {
                    const weekday = (colIdx + 1) % 7 === 0 ? 7 : (colIdx + 1) % 7;
                    const cell = grid[weekday][period];
                    if (!cell || !cell.show) return <td key={colIdx} style={{ border: '1px solid #e5e7eb', minHeight: 40, verticalAlign: 'top', padding: 4 }} />;
                    return (
                      <td
                        key={colIdx}
                        rowSpan={cell.rowspan}
                        style={{
                          border: '1px solid #e5e7eb',
                          minHeight: 40 * cell.rowspan,
                          verticalAlign: 'top',
                          padding: 0,
                          background: '#e0e7ff',
                        }}
                      >
                        <div style={{ height: '100%', width: '100%', padding: 8, fontSize: 13 }}>
                          <b>{cell.sch.subject?.name}</b><br />
                          <span style={{ color: '#334155' }}>{cell.sch.room}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ScheduleView; 