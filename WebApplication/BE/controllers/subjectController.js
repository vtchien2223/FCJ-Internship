const Subject = require('../models/Subject');

async function createSubject(req, res) {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getSubjects(req, res) {
  try {
    const subjects = await Subject.find().populate('major');
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getSubjectById(req, res) {
  try {
    const subject = await Subject.findById(req.params.id).populate('major');
    if (!subject) return res.status(404).json({ error: 'Not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateSubject(req, res) {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) return res.status(404).json({ error: 'Not found' });
    res.json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteSubject(req, res) {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
}; 