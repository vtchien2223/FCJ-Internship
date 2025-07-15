const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true }, // mã giảng viên
  name: { type: String, required: true }, // họ tên
  email: { type: String, required: true, unique: true }, // email
  phone: { type: String, required: true, unique: true }, // sdt
  major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true }, // chuyên ngành
});

module.exports = mongoose.model('Teacher', teacherSchema); 