const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware xác thực JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// Tạo sinh viên mới
async function createStudent(req, res) {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ ...rest, password: hashedPassword });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Lấy danh sách sinh viên
async function getStudents(req, res) {
  try {
    const students = await Student.find().populate('major');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy thông tin sinh viên theo id
async function getStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id).populate('major');
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy thông tin sinh viên hiện tại
async function getCurrentStudent(req, res) {
  try {
    const student = await Student.findById(req.user.id).populate('major');
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Cập nhật sinh viên
async function updateStudent(req, res) {
  try {
    let updateData = { ...req.body };
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }
    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Xóa sinh viên
async function deleteStudent(req, res) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  authMiddleware,
  createStudent,
  getStudents,
  getStudentById,
  getCurrentStudent,
  updateStudent,
  deleteStudent,
}; 