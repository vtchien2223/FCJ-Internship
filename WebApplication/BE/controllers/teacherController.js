const Teacher = require('../models/Teacher');

async function createTeacher(req, res) {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getTeachers(req, res) {
  try {
    const teachers = await Teacher.find().populate('major');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTeacherById(req, res) {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('major');
    if (!teacher) return res.status(404).json({ error: 'Not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateTeacher(req, res) {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return res.status(404).json({ error: 'Not found' });
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteTeacher(req, res) {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
}; 