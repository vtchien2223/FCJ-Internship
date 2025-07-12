const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
  majorId: { type: String, required: true, unique: true }, // mã chuyên ngành
  name: { type: String, required: true }, // tên chuyên ngành
  description: { type: String }, // mô tả
});

module.exports = mongoose.model('Major', majorSchema); 