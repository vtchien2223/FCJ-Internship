const express = require('express');
const router = express.Router();
const majorController = require('../controllers/majorController');

router.post('/', majorController.createMajor);
router.get('/', majorController.getMajors);
router.get('/:id', majorController.getMajorById);
router.put('/:id', majorController.updateMajor);
router.delete('/:id', majorController.deleteMajor);

module.exports = router; 