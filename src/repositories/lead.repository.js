const Lead = require('../models/Lead');

class LeadRepository {
  async create(leadData) {
    return await Lead.create(leadData);
  }

  async findAll() {
    return await Lead.find().sort('-createdAt');
  }
}

module.exports = new LeadRepository();