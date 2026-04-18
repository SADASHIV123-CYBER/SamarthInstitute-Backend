const express = require('express');
const {
  generateCode,
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
} = require('../controllers/attendance.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/code', protect, authorize('admin'), generateCode);
router.post('/mark', protect, authorize('student'), markAttendance);
router.get('/my', protect, authorize('student'), getStudentAttendance);
router.get('/', protect, authorize('admin'), getAllAttendance);

module.exports = router;