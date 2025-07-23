const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true }, // mã sinh viên
  name: { type: String, required: true }, // họ tên
  dob: { type: Date }, // ngày sinh
  hometown: { type: String }, // quê quán
  phone: { type: String }, // sdt
  email: { type: String}, // email
  major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true }, // chuyên ngành
  password: { type: String, required: true }, // mật khẩu
});

module.exports = mongoose.model('Student', studentSchema); 