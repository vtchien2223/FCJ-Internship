const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true }, // mã sinh viên
  name: { type: String, required: true }, // họ tên
  dob: { type: Date }, // ngày sinh
  hometown: { type: String }, // quê quán
  phone: { type: String, unique: true }, // sdt
  email: { type: String, unique: true }, // email
  major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true }, // chuyên ngành
  password: { type: String, required: true }, // mật khẩu
});

module.exports = mongoose.model('Student', studentSchema); 