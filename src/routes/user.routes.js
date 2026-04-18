const express = require('express');
const { getAllStudents, updateStudent } = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/students', protect, authorize('admin'), getAllStudents);
router.put('/students/:id', protect, authorize('admin'), updateStudent);

module.exports = router;