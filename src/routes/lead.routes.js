const express = require('express');
const { createLead, getLeads } = require('../controllers/lead.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', createLead);
router.get('/', protect, authorize('admin'), getLeads);

module.exports = router;