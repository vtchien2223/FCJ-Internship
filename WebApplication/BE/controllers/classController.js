const Class = require('../models/Class');

async function createClass(req, res) {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getClasses(req, res) {
  try {
    const classes = await Class.find().populate('subject teacher students.student');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getClassById(req, res) {
  try {
    const classItem = await Class.findById(req.params.id).populate('subject teacher students.student');
    if (!classItem) return res.status(404).json({ error: 'Not found' });
    res.json(classItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateClass(req, res) {
  try {
    const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classItem) return res.status(404).json({ error: 'Not found' });
    res.json(classItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteClass(req, res) {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Lấy điểm của sinh viên hiện tại trong lớp (theo classId)
async function getMyScoreInClass(req, res) {
  try {
    const classItem = await Class.findOne({ classId: req.params.id }).populate('subject teacher students.student');
    if (!classItem) return res.status(404).json({ error: 'Class not found' });
    const myScore = classItem.students.find(s => s.student._id.toString() === req.user.id);
    if (!myScore) return res.status(404).json({ error: 'You are not in this class' });
    res.json({
      classId: classItem.classId,
      subject: classItem.subject,
      teacher: classItem.teacher,
      score: {
        attendance: myScore.attendance,
        test: myScore.test,
        total: myScore.total,
        gpa4: myScore.gpa4
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  getMyScoreInClass,
}; 