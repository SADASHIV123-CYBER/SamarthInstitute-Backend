const attendanceService = require('../services/attendance.service');

exports.generateCode = async (req, res, next) => {
  try {
    const code = await attendanceService.generateCode(req.user.id);
    res.json({ success: true, code });
  } catch (err) {
    next(err);
  }
};

exports.markAttendance = async (req, res, next) => {
  try {
    const { code } = req.body;
    const record = await attendanceService.markAttendance(req.user.id, code);
    res.json({ success: true, record });
  } catch (err) {
    next(err);
  }
};

exports.getStudentAttendance = async (req, res, next) => {
  try {
    const records = await attendanceService.getStudentAttendance(req.user.id);
    res.json({ success: true, records });
  } catch (err) {
    next(err);
  }
};

exports.getAllAttendance = async (req, res, next) => {
  try {
    const records = await attendanceService.getAllAttendance();
    res.json({ success: true, records });
  } catch (err) {
    next(err);
  }
};