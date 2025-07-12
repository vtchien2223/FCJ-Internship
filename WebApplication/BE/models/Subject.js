const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectId: { type: String, required: true, unique: true }, // mã môn
  name: { type: String, required: true }, // tên môn học
  major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true }, // chuyên ngành
});

module.exports = mongoose.model('Subject', subjectSchema); 