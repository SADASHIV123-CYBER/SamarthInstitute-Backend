const userRepository = require('../repositories/user.repository');

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return await userRepository.create(userData);
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = user.getSignedJwtToken();
    return { user, token };
  }

  async getMe(userId) {
    return await userRepository.findById(userId);
  }
}

module.exports = new AuthService();