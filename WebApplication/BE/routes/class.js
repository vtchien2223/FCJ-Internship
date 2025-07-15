const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authMiddleware } = require('../controllers/studentController');

router.post('/', classController.createClass);
router.get('/', classController.getClasses);
router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);
router.get('/:id/me', authMiddleware, classController.getMyScoreInClass);

module.exports = router; 