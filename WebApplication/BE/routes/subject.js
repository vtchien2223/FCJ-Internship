const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { authMiddleware } = require('../controllers/studentController');

router.post('/', subjectController.createSubject);
router.get('/', subjectController.getSubjects);
router.get('/me', authMiddleware, subjectController.getMySubjects);
router.get('/:id', subjectController.getSubjectById);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router; 