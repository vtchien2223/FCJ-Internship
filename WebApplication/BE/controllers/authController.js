const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
const Teacher = require('../models/Teacher');

// Đăng nhập
async function login(req, res) {
  const { studentId, password, userType } = req.body;
  try {
    if (userType === 'teacher') {
      const teacher = await Teacher.findOne({ teacherId: studentId });
      if (!teacher) {
        return res.status(401).json({ error: 'Sai mã giảng viên hoặc mật khẩu' });
      }
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Sai mã giảng viên hoặc mật khẩu' });
      }
      const token = jwt.sign({ id: teacher._id, teacherId: teacher.teacherId, userType: 'teacher' }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, userType: 'teacher', teacherId: teacher.teacherId });
    } else {
      const student = await Student.findOne({ studentId });
      if (!student) {
        return res.status(401).json({ error: 'Sai mã sinh viên hoặc mật khẩu' });
      }
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Sai mã sinh viên hoặc mật khẩu' });
      }
      const token = jwt.sign({ id: student._id, studentId: student.studentId, userType: 'student' }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, userType: 'student' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { login }; 