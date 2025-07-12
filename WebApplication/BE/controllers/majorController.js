const Major = require('../models/Major');

async function createMajor(req, res) {
  try {
    const major = new Major(req.body);
    await major.save();
    res.status(201).json(major);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getMajors(req, res) {
  try {
    const majors = await Major.find();
    res.json(majors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMajorById(req, res) {
  try {
    const major = await Major.findById(req.params.id);
    if (!major) return res.status(404).json({ error: 'Not found' });
    res.json(major);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateMajor(req, res) {
  try {
    const major = await Major.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!major) return res.status(404).json({ error: 'Not found' });
    res.json(major);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteMajor(req, res) {
  try {
    const major = await Major.findByIdAndDelete(req.params.id);
    if (!major) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createMajor,
  getMajors,
  getMajorById,
  updateMajor,
  deleteMajor,
}; 