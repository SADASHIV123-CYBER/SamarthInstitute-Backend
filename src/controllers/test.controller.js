const testService = require('../services/test.service');

exports.createTest = async (req, res, next) => {
  try {
    const test = await testService.createTest(req.body, req.user.id);
    res.status(201).json({ success: true, test });
  } catch (err) {
    next(err);
  }
};

exports.activateTest = async (req, res, next) => {
  try {
    const test = await testService.activateTest(req.params.id);
    res.json({ success: true, test });
  } catch (err) {
    next(err);
  }
};

exports.getActiveTest = async (req, res, next) => {
  try {
    const test = await testService.getActiveTest();
    res.json({ success: true, test });
  } catch (err) {
    next(err);
  }
};

exports.submitTest = async (req, res, next) => {
  try {
    const { testId, answers, timeTaken } = req.body;
    const result = await testService.submitAttempt(testId, req.user.id, answers, timeTaken);
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await testService.getLeaderboard(req.params.testId);
    res.json({ success: true, leaderboard });
  } catch (err) {
    next(err);
  }
};

exports.getStudentAttempt = async (req, res, next) => {
  try {
    const attempt = await testService.getStudentAttempt(req.params.testId, req.user.id);
    res.json({ success: true, attempt });
  } catch (err) {
    next(err);
  }
};