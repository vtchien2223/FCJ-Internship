const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const multer = require('multer');
const path = require('path');



// Cấu hình lưu file tạm
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // tạo thư mục nếu chưa có
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Route upload file xlsx
router.post(
  '/upload-xlsx',
  upload.single('file'),
  studentController.importStudentsFromExcel
);


router.post('/', studentController.createStudent);
router.post('/bulk', studentController.bulkCreateStudents);
router.post('/upload-xlsx', upload.single('file'), studentController.importStudentsFromExcel);
router.get('/', studentController.getStudents);
router.get('/me', studentController.authMiddleware, studentController.getCurrentStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);


module.exports = router; 