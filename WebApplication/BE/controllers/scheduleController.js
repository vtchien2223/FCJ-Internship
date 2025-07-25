const Schedule = require('../models/Schedule');

// Tạo thời khoá biểu mới
async function createSchedule(req, res) {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Lấy tất cả thời khoá biểu
async function getSchedules(req, res) {
  try {
    const filter = {};
    if (req.query.teacherId) {
      filter.teacher = req.query.teacherId;
    }
    const schedules = await Schedule.find(filter).populate('semester class subject teacher');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy thời khoá biểu theo id
async function getScheduleById(req, res) {
  try {
    const schedule = await Schedule.findById(req.params.id).populate('semester class subject teacher');
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Cập nhật thời khoá biểu
async function updateSchedule(req, res) {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Xoá thời khoá biểu
async function deleteSchedule(req, res) {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
}; 