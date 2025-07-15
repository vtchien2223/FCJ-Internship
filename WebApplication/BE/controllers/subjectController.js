const Subject = require('../models/Subject');
const Class = require('../models/Class');

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

// Lấy tất cả các môn học của sinh viên hiện tại và điểm
async function getMySubjects(req, res) {
  try {
    // Lấy tất cả các lớp mà sinh viên này tham gia
    const classes = await Class.find({ 'students.student': req.user.id }).populate('subject');
    // Map ra các môn học và điểm
    const subjects = classes.map(cls => {
      const myScore = cls.students.find(s => s.student.toString() === req.user.id);
      return {
        subject: cls.subject,
        classId: cls.classId,
        score: myScore ? {
          attendance: myScore.attendance,
          test: myScore.test,
          total: myScore.total,
          gpa4: myScore.gpa4
        } : null
      };
    });
    res.json(subjects);
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
  getMySubjects,
}; 