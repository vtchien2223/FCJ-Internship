const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  semesterId: { type: String, required: true, unique: true }, // mã kỳ học
  name: { type: String, required: true }, // tên kỳ học
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }], // các lớp học thuộc kỳ này
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // sinh viên tham gia kỳ này
});

module.exports = mongoose.model('Semester', semesterSchema); 