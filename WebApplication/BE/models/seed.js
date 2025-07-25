const mongoose = require('mongoose');
const Student = require('./Student');
const Teacher = require('./Teacher');
const Subject = require('./Subject');
const Class = require('./Class');
const Major = require('./Major');
const bcrypt = require('bcrypt');
const Semester = require('./Semester');
const Schedule = require('./Schedule');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/education');

  // Xóa dữ liệu cũ
  await Student.deleteMany({});
  await Teacher.deleteMany({});
  await Subject.deleteMany({});
  await Class.deleteMany({});
  await Major.deleteMany({});
  await Semester.deleteMany({});
  await Schedule.deleteMany({});

  // Thêm major mẫu
  const majors = await Major.insertMany([
    { majorId: 'MATH', name: 'Toán', description: 'Ngành Toán học' },
    { majorId: 'PHYS', name: 'Vật lý', description: 'Ngành Vật lý' },
    { majorId: 'CS', name: 'CNTT', description: 'Ngành Công nghệ thông tin' },
    { majorId: 'ENG', name: 'Tiếng Anh', description: 'Ngành Ngôn ngữ Anh' },
    { majorId: 'CHEM', name: 'Hóa học', description: 'Ngành Hóa học' },
    { majorId: 'BIO', name: 'Sinh học', description: 'Ngành Sinh học' },
  ]);

  // Thêm subject mẫu
  const subjects = await Subject.insertMany([
    { subjectId: 'MATH101', name: 'Toán cao cấp', major: majors[0]._id },
    { subjectId: 'PHY101', name: 'Vật lý đại cương', major: majors[1]._id },
    { subjectId: 'CS101', name: 'Lập trình cơ bản', major: majors[2]._id },
    { subjectId: 'ENG101', name: 'Tiếng Anh 1', major: majors[3]._id },
    { subjectId: 'CHEM101', name: 'Hóa đại cương', major: majors[4]._id },
    { subjectId: 'BIO101', name: 'Sinh học đại cương', major: majors[5]._id },
  ]);

  // Thêm teacher mẫu
  const teacherPassword = await bcrypt.hash('123456', 10);
  const teachers = await Teacher.insertMany([
    { teacherId: 'GV001', name: 'Nguyễn Văn A', email: 'a@school.edu', phone: '0900000001', major: majors[0]._id, password: teacherPassword },
    { teacherId: 'GV002', name: 'Trần Thị B', email: 'b@school.edu', phone: '0900000002', major: majors[1]._id, password: teacherPassword },
    { teacherId: 'GV003', name: 'Lê Văn C', email: 'c@school.edu', phone: '0900000003', major: majors[2]._id, password: teacherPassword },
    { teacherId: 'GV004', name: 'Phạm Thị D', email: 'd@school.edu', phone: '0900000004', major: majors[3]._id, password: teacherPassword },
    { teacherId: 'GV005', name: 'Hoàng Văn E', email: 'e@school.edu', phone: '0900000005', major: majors[4]._id, password: teacherPassword },
    { teacherId: 'GV006', name: 'Đỗ Thị F', email: 'f@school.edu', phone: '0900000006', major: majors[5]._id, password: teacherPassword },
  ]);

  // Thêm student mẫu
  const hash1 = await bcrypt.hash('123456', 10);
  const hash2 = await bcrypt.hash('123456', 10);
  const hash3 = await bcrypt.hash('123456', 10);
  const hash4 = await bcrypt.hash('123456', 10);
  const hash5 = await bcrypt.hash('123456', 10);
  const hash6 = await bcrypt.hash('123456', 10);
  const students = await Student.insertMany([
    { studentId: 'SV001', name: 'Sinh Viên 1', dob: new Date('2002-01-01'), hometown: 'Hà Nội', phone: '0911111111', email: 'sv1@school.edu', major: majors[0]._id, password: hash1 },
    { studentId: 'SV002', name: 'Sinh Viên 2', dob: new Date('2002-02-02'), hometown: 'Hải Phòng', phone: '0922222222', email: 'sv2@school.edu', major: majors[1]._id, password: hash2 },
    { studentId: 'SV003', name: 'Sinh Viên 3', dob: new Date('2002-03-03'), hometown: 'Nam Định', phone: '0933333333', email: 'sv3@school.edu', major: majors[2]._id, password: hash3 },
    { studentId: 'SV004', name: 'Sinh Viên 4', dob: new Date('2002-04-04'), hometown: 'Đà Nẵng', phone: '0944444444', email: 'sv4@school.edu', major: majors[3]._id, password: hash4 },
    { studentId: 'SV005', name: 'Sinh Viên 5', dob: new Date('2002-05-05'), hometown: 'Huế', phone: '0955555555', email: 'sv5@school.edu', major: majors[4]._id, password: hash5 },
    { studentId: 'SV006', name: 'Sinh Viên 6', dob: new Date('2002-06-06'), hometown: 'Cần Thơ', phone: '0966666666', email: 'sv6@school.edu', major: majors[5]._id, password: hash6 },
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
        { student: students[2]._id, attendance: 7, test: 6, total: 6.5, gpa4: 2.5 },
      ],
    },
    {
      classId: 'CL002',
      subject: subjects[1]._id,
      teacher: teachers[1]._id,
      students: [
        { student: students[1]._id, attendance: 7, test: 6, total: 6.5, gpa4: 2.5 },
        { student: students[2]._id, attendance: 8, test: 7, total: 7.5, gpa4: 3.0 },
        { student: students[3]._id, attendance: 9, test: 9, total: 9.0, gpa4: 4.0 },
      ],
    },
    {
      classId: 'CL003',
      subject: subjects[2]._id,
      teacher: teachers[2]._id,
      students: [
        { student: students[2]._id, attendance: 10, test: 9, total: 9.5, gpa4: 4.0 },
        { student: students[3]._id, attendance: 8, test: 8, total: 8.0, gpa4: 3.2 },
        { student: students[4]._id, attendance: 7, test: 7, total: 7.0, gpa4: 2.8 },
      ],
    },
    {
      classId: 'CL004',
      subject: subjects[3]._id,
      teacher: teachers[3]._id,
      students: [
        { student: students[3]._id, attendance: 9, test: 8, total: 8.5, gpa4: 3.5 },
        { student: students[4]._id, attendance: 8, test: 7, total: 7.5, gpa4: 3.0 },
        { student: students[5]._id, attendance: 7, test: 6, total: 6.5, gpa4: 2.5 },
      ],
    },
    {
      classId: 'CL005',
      subject: subjects[4]._id,
      teacher: teachers[4]._id,
      students: [
        { student: students[4]._id, attendance: 10, test: 10, total: 10.0, gpa4: 4.0 },
        { student: students[5]._id, attendance: 9, test: 8, total: 8.5, gpa4: 3.5 },
        { student: students[0]._id, attendance: 8, test: 7, total: 7.5, gpa4: 3.0 },
      ],
    },
    {
      classId: 'CL006',
      subject: subjects[5]._id,
      teacher: teachers[5]._id,
      students: [
        { student: students[5]._id, attendance: 8, test: 8, total: 8.0, gpa4: 3.2 },
        { student: students[0]._id, attendance: 7, test: 7, total: 7.0, gpa4: 2.8 },
        { student: students[1]._id, attendance: 6, test: 6, total: 6.0, gpa4: 2.0 },
      ],
    },
  ]);

  // Thêm semester mẫu
  const semesters = await Semester.insertMany([
    {
      semesterId: '20231',
      name: 'Học kỳ 1 - 2023',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-06-01'),
      classes: [],
      students: [],
    },
    {
      semesterId: '20232',
      name: 'Học kỳ 2 - 2023',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-12-31'),
      classes: [],
      students: [],
    },
  ]);
  // Gán lớp và sinh viên thực tế vào các kỳ học
  semesters[0].classes = [
    (await Class.findOne({ classId: 'CL001' }))._id,
    (await Class.findOne({ classId: 'CL002' }))._id,
    (await Class.findOne({ classId: 'CL003' }))._id,
  ];
  semesters[0].students = [
    (await Student.findOne({ studentId: 'SV001' }))._id,
    (await Student.findOne({ studentId: 'SV002' }))._id,
    (await Student.findOne({ studentId: 'SV003' }))._id,
    (await Student.findOne({ studentId: 'SV004' }))._id,
  ];
  semesters[1].classes = [
    (await Class.findOne({ classId: 'CL004' }))._id,
    (await Class.findOne({ classId: 'CL005' }))._id,
    (await Class.findOne({ classId: 'CL006' }))._id,
  ];
  semesters[1].students = [
    (await Student.findOne({ studentId: 'SV003' }))._id,
    (await Student.findOne({ studentId: 'SV004' }))._id,
    (await Student.findOne({ studentId: 'SV005' }))._id,
    (await Student.findOne({ studentId: 'SV006' }))._id,
    (await Student.findOne({ studentId: 'SV001' }))._id,
  ];
  await semesters[0].save();
  await semesters[1].save();

  // Thêm schedule mẫu cho mỗi kỳ học
  const scheduleData = [
    // Kỳ 1
    {
      semester: semesters[0]._id,
      class: (await Class.findOne({ classId: 'CL001' }))._id,
      subject: (await Subject.findOne({ subjectId: 'MATH101' }))._id,
      teacher: (await Teacher.findOne({ teacherId: 'GV001' }))._id,
      weekday: 1, periodFrom: 1, periodTo: 3, room: 'A101', date: new Date('2023-02-06'),
    },
    {
      semester: semesters[0]._id,
      class: (await Class.findOne({ classId: 'CL002' }))._id,
      subject: (await Subject.findOne({ subjectId: 'PHY101' }))._id,
      teacher: (await Teacher.findOne({ teacherId: 'GV002' }))._id,
      weekday: 3, periodFrom: 4, periodTo: 6, room: 'B202', date: new Date('2023-03-08'),
    },
    {
      semester: semesters[0]._id,
      class: (await Class.findOne({ classId: 'CL003' }))._id,
      subject: (await Subject.findOne({ subjectId: 'CS101' }))._id,
      teacher: (await Teacher.findOne({ teacherId: 'GV003' }))._id,
      weekday: 5, periodFrom: 7, periodTo: 9, room: 'C303', date: new Date('2023-04-14'),
    },
    // Kỳ 2
    {
      semester: semesters[1]._id,
      class: (await Class.findOne({ classId: 'CL004' }))._id,
      subject: (await Subject.findOne({ subjectId: 'ENG101' }))._id,
      teacher: (await Teacher.findOne({ teacherId: 'GV004' }))._id,
      weekday: 2, periodFrom: 2, periodTo: 4, room: 'D404', date: new Date('2023-08-15'),
    },
    {
      semester: semesters[1]._id,
      class: (await Class.findOne({ classId: 'CL005' }))._id,
      subject: (await Subject.findOne({ subjectId: 'CHEM101' }))._id,
      teacher: (await Teacher.findOne({ teacherId: 'GV005' }))._id,
      weekday: 4, periodFrom: 5, periodTo: 7, room: 'E505', date: new Date('2023-09-20'),
    },
    {
      semester: semesters[1]._id,
      class: (await Class.findOne({ classId: 'CL006' }))._id,
      subject: (await Subject.findOne({ subjectId: 'BIO101' }))._id,
      teacher: (await Teacher.findOne({ teacherId: 'GV006' }))._id,
      weekday: 6, periodFrom: 8, periodTo: 10, room: 'F606', date: new Date('2023-10-28'),
    },
  ];
  await Schedule.insertMany(scheduleData);

  console.log('Seed data thành công!');
  mongoose.disconnect();
}

seed(); 