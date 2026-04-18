const testRepository = require('../repositories/test.repository');

class TestService {
  async createTest(testData, adminId) {
    testData.createdBy = adminId;
    return await testRepository.create(testData);
  }

  async activateTest(testId) {
    const test = await testRepository.findById(testId);
    if (!test) throw new Error('Test not found');
    // Deactivate others
    await testRepository.update({}, { isActive: false });
    test.isActive = true;
    test.startTime = new Date();
    test.endTime = new Date(Date.now() + test.duration * 60 * 1000);
    return await test.save();
  }

  async getActiveTest() {
    return await testRepository.findActive();
  }

  async submitAttempt(testId, studentId, answers, timeTaken) {
    const test = await testRepository.findById(testId);
    if (!test || !test.isActive) throw new Error('Test not active');

    const existing = await testRepository.findAttempt(testId, studentId);
    if (existing) throw new Error('Already attempted');

    let score = 0;
    const processedAnswers = answers.map((ans, idx) => {
      const question = test.questions[idx];
      const isCorrect = ans === question.correctOption;
      if (isCorrect) score++;
      return { questionIndex: idx, selectedOption: ans, isCorrect };
    });

    const attempt = await testRepository.createAttempt({
      test: testId,
      student: studentId,
      answers: processedAnswers,
      score,
      totalQuestions: test.questions.length,
      startedAt: test.startTime,
      submittedAt: new Date(),
      timeTaken,
    });
    return { attempt, score };
  }

  async getLeaderboard(testId) {
    return await testRepository.getLeaderboard(testId);
  }

  async getStudentAttempt(testId, studentId) {
    return await testRepository.findAttempt(testId, studentId);
  }
}

module.exports = new TestService();