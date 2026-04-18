const leadService = require('../services/lead.service');

exports.createLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ success: true, lead });
  } catch (err) {
    next(err);
  }
};

exports.getLeads = async (req, res, next) => {
  try {
    const leads = await leadService.getAllLeads();
    res.json({ success: true, leads });
  } catch (err) {
    next(err);
  }
};