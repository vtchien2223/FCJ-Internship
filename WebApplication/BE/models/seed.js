const mongoose = require('mongoose');
const Student = require('./Student');
const Teacher = require('./Teacher');
const Subject = require('./Subject');
const Class = require('./Class');
const Major = require('./Major');
const bcrypt = require('bcrypt');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/education');

  // Xóa dữ liệu cũ
  await Student.deleteMany({});
  await Teacher.deleteMany({});
  await Subject.deleteMany({});
  await Class.deleteMany({});
  await Major.deleteMany({});

  // Thêm major mẫu
  const majors = await Major.insertMany([
    { majorId: 'MATH', name: 'Toán', description: 'Ngành Toán học' },
    { majorId: 'PHYS', name: 'Vật lý', description: 'Ngành Vật lý' },
    { majorId: 'CS', name: 'CNTT', description: 'Ngành Công nghệ thông tin' },
  ]);

  // Thêm subject mẫu
  const subjects = await Subject.insertMany([
    { subjectId: 'MATH101', name: 'Toán cao cấp', major: majors[0]._id },
    { subjectId: 'PHY101', name: 'Vật lý đại cương', major: majors[1]._id },
    { subjectId: 'CS101', name: 'Lập trình cơ bản', major: majors[2]._id },
  ]);

  // Thêm teacher mẫu
  const teachers = await Teacher.insertMany([
    { teacherId: 'GV001', name: 'Nguyễn Văn A', email: 'a@school.edu', phone: '0900000001', major: majors[0]._id },
    { teacherId: 'GV002', name: 'Trần Thị B', email: 'b@school.edu', phone: '0900000002', major: majors[1]._id },
    { teacherId: 'GV003', name: 'Lê Văn C', email: 'c@school.edu', phone: '0900000003', major: majors[2]._id },
  ]);

  // Thêm student mẫu
  const hash1 = await bcrypt.hash('123456', 10);
  const hash2 = await bcrypt.hash('123456', 10);
  const hash3 = await bcrypt.hash('123456', 10);
  const students = await Student.insertMany([
    { studentId: 'SV001', name: 'Sinh Viên 1', dob: new Date('2002-01-01'), hometown: 'Hà Nội', phone: '0911111111', email: 'sv1@school.edu', major: majors[0]._id, password: hash1 },
    { studentId: 'SV002', name: 'Sinh Viên 2', dob: new Date('2002-02-02'), hometown: 'Hải Phòng', phone: '0922222222', email: 'sv2@school.edu', major: majors[1]._id, password: hash2 },
    { studentId: 'SV003', name: 'Sinh Viên 3', dob: new Date('2002-03-03'), hometown: 'Nam Định', phone: '0933333333', email: 'sv3@school.edu', major: majors[2]._id, password: hash3 },
  ]);

  // Thêm class mẫu
  await Class.insertMany([
    {
      classId: 'CL001',
      subject: subjects[0]._id,
      teacher: teachers[0]._id,
      students: [
        { student: students[0]._id, attendance: 8, test: 7, total: 7.5, gpa4: 3.0 },
        { student: students[1]._id, attendance: 9, test: 8, total: 8.5, gpa4: 3.5 },
      ],
    },
    {
      classId: 'CL002',
      subject: subjects[1]._id,
      teacher: teachers[1]._id,
      students: [
        { student: students[1]._id, attendance: 7, test: 6, total: 6.5, gpa4: 2.5 },
        { student: students[2]._id, attendance: 8, test: 7, total: 7.5, gpa4: 3.0 },
      ],
    },
  ]);

  console.log('Seed data thành công!');
  mongoose.disconnect();
}

seed(); 