const express = require('express');
const {
  createTest,
  activateTest,
  getActiveTest,
  submitTest,
  getLeaderboard,
  getStudentAttempt,
} = require('../controllers/test.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', protect, authorize('admin'), createTest);
router.put('/:id/activate', protect, authorize('admin'), activateTest);
router.get('/active', protect, getActiveTest);
router.post('/submit', protect, authorize('student'), submitTest);
router.get('/:testId/leaderboard', protect, getLeaderboard);
router.get('/:testId/attempt', protect, authorize('student'), getStudentAttempt);

module.exports = router;