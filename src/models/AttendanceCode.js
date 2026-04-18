const mongoose = require('mongoose');

const attendanceCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AttendanceCode', attendanceCodeSchema);