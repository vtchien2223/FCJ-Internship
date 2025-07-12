const mongoose = require('mongoose');

const studentScoreSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  attendance: { type: Number, default: 0 }, // điểm chuyên cần
  test: { type: Number, default: 0 }, // điểm kiểm tra
  total: { type: Number, default: 0 }, // điểm tổng
  gpa4: { type: Number, default: 0 }, // điểm theo hệ số 4
});

const classSchema = new mongoose.Schema({
  classId: { type: String, required: true, unique: true }, // mã lớp
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }, // môn học
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // giáo viên
  students: [studentScoreSchema], // danh sách sinh viên và điểm
});

module.exports = mongoose.model('Class', classSchema); 