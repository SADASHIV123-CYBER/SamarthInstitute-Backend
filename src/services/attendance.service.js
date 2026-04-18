const attendanceRepository = require('../repositories/attendance.repository');
const crypto = require('crypto');

class AttendanceService {
  async generateCode(adminId) {
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    return await attendanceRepository.createCode({ code, expiresAt, createdBy: adminId });
  }

  async markAttendance(studentId, enteredCode) {
    const activeCode = await attendanceRepository.findActiveCode();
    if (!activeCode) {
      throw new Error('No active attendance code');
    }
    if (activeCode.code !== enteredCode) {
      throw new Error('Invalid code');
    }
    // Check if already marked today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existing = await attendanceRepository.findRecordsByStudent(studentId);
    const alreadyMarked = existing.some(
      (record) => new Date(record.date).setHours(0, 0, 0, 0) === today.getTime()
    );
    if (alreadyMarked) {
      throw new Error('Attendance already marked for today');
    }
    const record = await attendanceRepository.createRecord({
      student: studentId,
      codeUsed: enteredCode,
    });
    // Optionally deactivate code after first use? For demo we keep active until expiry.
    return record;
  }

  async getStudentAttendance(studentId) {
    return await attendanceRepository.findRecordsByStudent(studentId);
  }

  async getAllAttendance() {
    return await attendanceRepository.findAllRecords();
  }
}

module.exports = new AttendanceService();