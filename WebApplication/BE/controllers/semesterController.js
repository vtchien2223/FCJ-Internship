const Semester = require('../models/Semester');

// Tạo kỳ học mới
async function createSemester(req, res) {
  try {
    const semester = new Semester(req.body);
    await semester.save();
    res.status(201).json(semester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Lấy danh sách kỳ học
async function getSemesters(req, res) {
  try {
    const semesters = await Semester.find().populate('classes students');
    res.json(semesters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy kỳ học theo id
async function getSemesterById(req, res) {
  try {
    const semester = await Semester.findById(req.params.id).populate('classes students');
    if (!semester) return res.status(404).json({ error: 'Not found' });
    res.json(semester);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Cập nhật kỳ học
async function updateSemester(req, res) {
  try {
    const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!semester) return res.status(404).json({ error: 'Not found' });
    res.json(semester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Xóa kỳ học
async function deleteSemester(req, res) {
  try {
    const semester = await Semester.findByIdAndDelete(req.params.id);
    if (!semester) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createSemester,
  getSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
}; 