const AttendanceCode = require('../models/AttendanceCode');
const AttendanceRecord = require('../models/AttendanceRecord');

class AttendanceRepository {
  async createCode(codeData) {
    return await AttendanceCode.create(codeData);
  }

  async findActiveCode() {
    return await AttendanceCode.findOne({ isActive: true, expiresAt: { $gt: new Date() } });
  }

  async deactivateCode(codeId) {
    return await AttendanceCode.findByIdAndUpdate(codeId, { isActive: false });
  }

  async createRecord(recordData) {
    return await AttendanceRecord.create(recordData);
  }

  async findRecordsByStudent(studentId) {
    return await AttendanceRecord.find({ student: studentId }).sort('-date');
  }

  async findAllRecords() {
    return await AttendanceRecord.find().populate('student', 'name email').sort('-date');
  }
}

module.exports = new AttendanceRepository();