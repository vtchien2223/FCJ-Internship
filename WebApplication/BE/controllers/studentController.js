const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
const XLSX = require('xlsx');
const fs = require('fs');
const Major = require('../models/Major');


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
async function bulkCreateStudents(req, res) {
  try {
    const { names, year, mongoMajorObjectId } = req.body;

    if (!Array.isArray(names) || names.length === 0 || !year || !mongoMajorObjectId) {
      return res.status(400).json({ error: 'Dữ liệu không hợp lệ: cần có tên, năm học và ObjectId ngành' });
    }

    // ✅ Tìm ngành trong bảng Major
    const major = await Major.findById(mongoMajorObjectId);
    if (!major) {
      return res.status(404).json({ error: 'Không tìm thấy ngành tương ứng' });
    }

    const majorId = major.majorId; // ví dụ: 'IT', 'CS'

    const createdStudents = [];
    const prefix = `${year}${majorId}`;

    // ✅ Tìm các studentId đã tồn tại theo prefix
    const existing = await Student.find({ studentId: { $regex: `^${prefix}` } }, 'studentId');

    // ✅ Tìm số lớn nhất hiện có
    let maxIndex = 0;
    for (const s of existing) {
      const match = s.studentId.match(new RegExp(`^${prefix}(\\d+)$`));
      if (match) {
        const num = parseInt(match[1]);
        if (!isNaN(num) && num > maxIndex) maxIndex = num;
      }
    }

    let counter = maxIndex + 1;

    for (const name of names) {
      const number = counter.toString().padStart(5, '0');
      const studentId = `${prefix}${number}`;
      const hashedPassword = await bcrypt.hash(studentId, 10);

      const student = new Student({
        studentId,
        name,
        major: mongoMajorObjectId, // Lưu ObjectId của ngành
        password: hashedPassword,
      });

      await student.save();
      createdStudents.push({ name, studentId });
      counter++;
    }

    res.status(201).json({
      message: 'Tạo tài khoản thành công',
      students: createdStudents,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function importStudentsFromExcel(req, res) {
  try {
    const { year, mongoMajorObjectId } = req.body;
    if (!req.file || !year || !mongoMajorObjectId) {
      return res.status(400).json({ error: 'Thiếu file hoặc thông tin năm học/ngành học' });
    }

    // Kiểm tra ngành
    const major = await Major.findById(mongoMajorObjectId);
    if (!major) {
      return res.status(404).json({ error: 'Không tìm thấy ngành tương ứng' });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Mặc định lấy cột 'name' trong file
    const names = data.map((row) => row.name).filter((n) => !!n);

    if (names.length === 0) {
      return res.status(400).json({ error: 'Không có dữ liệu tên sinh viên hợp lệ trong file' });
    }

    // Gọi lại hàm đã có để tạo tài khoản hàng loạt
    req.body.names = names;
    req.body.majorId = major.majorId;
    req.body.mongoMajorObjectId = mongoMajorObjectId;

    // Xoá file sau khi xử lý
    fs.unlinkSync(req.file.path);

    // Gọi lại hàm tạo sinh viên hàng loạt
    return bulkCreateStudents(req, res);
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
  bulkCreateStudents,
  importStudentsFromExcel,
}; 