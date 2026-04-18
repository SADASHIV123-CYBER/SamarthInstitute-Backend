const Test = require('../models/Test');
const TestAttempt = require('../models/TestAttempt');

class TestRepository {
  async create(testData) {
    return await Test.create(testData);
  }

  async findActive() {
    return await Test.findOne({ isActive: true });
  }

  async findById(id) {
    return await Test.findById(id);
  }

  async update(id, updateData) {
    return await Test.findByIdAndUpdate(id, updateData, { new: true });
  }

  async updateMany(filter, updateData) {
    return await Test.updateMany(filter, updateData);
  }

  async findAll() {
    return await Test.find().sort('-createdAt');
  }

  async createAttempt(attemptData) {
    return await TestAttempt.create(attemptData);
  }

  async findAttempt(testId, studentId) {
    return await TestAttempt.findOne({ test: testId, student: studentId });
  }

  async getLeaderboard(testId) {
    return await TestAttempt.find({ test: testId })
      .populate('student', 'name email')
      .sort('-score')
      .limit(20);
  }
}

module.exports = new TestRepository();