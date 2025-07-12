const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/education', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const studentRoutes = require('./routes/student');
const subjectRoutes = require('./routes/subject');
const majorRoutes = require('./routes/major');
const authRoutes = require('./routes/auth');
const teacherRoutes = require('./routes/teacher');
const classRoutes = require('./routes/class');

app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/majors', majorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);

// Định nghĩa route mẫu
app.get('/', (req, res) => {
  res.send('Education API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 