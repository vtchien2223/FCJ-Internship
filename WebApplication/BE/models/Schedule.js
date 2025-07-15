const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true }, // kỳ học
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },      // lớp học
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },  // môn học
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },  // giáo viên
  weekday: { type: Number, required: true },      // 0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7
  periodFrom: { type: Number, required: true },   // Tiết bắt đầu (1-13)
  periodTo: { type: Number, required: true },     // Tiết kết thúc (1-13)
  room: { type: String, required: true },         // Phòng học
  date: { type: Date, required: true },           // Ngày học cụ thể
});

// Đảm bảo ngày học nằm trong kỳ học
scheduleSchema.pre('save', async function(next) {
  const Semester = mongoose.model('Semester');
  const semester = await Semester.findById(this.semester);
  if (!semester) return next(new Error('Semester not found'));
  if (this.date < semester.startDate || this.date > semester.endDate) {
    return next(new Error('Schedule date must be within the semester period'));
  }
  next();
});

module.exports = mongoose.model('Schedule', scheduleSchema); 