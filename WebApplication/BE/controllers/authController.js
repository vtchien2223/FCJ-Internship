const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

// Đăng nhập
async function login(req, res) {
  const { studentId, password } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(401).json({ error: 'Sai mã sinh viên hoặc mật khẩu' });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Sai mã sinh viên hoặc mật khẩu' });
    }
    // Tạo JWT
    const token = jwt.sign({ id: student._id, studentId: student.studentId }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { login }; 