const leadRepository = require('../repositories/lead.repository');

class LeadService {
  async createLead(leadData) {
    return await leadRepository.create(leadData);
  }

  async getAllLeads() {
    return await leadRepository.findAll();
  }
}

module.exports = new LeadService();