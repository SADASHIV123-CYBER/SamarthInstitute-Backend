const userRepository = require('../repositories/user.repository');

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await userRepository.findAll({ role: 'student' });
    res.json({ success: true, students });
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student = await userRepository.update(req.params.id, req.body);
    res.json({ success: true, student });
  } catch (err) {
    next(err);
  }
};