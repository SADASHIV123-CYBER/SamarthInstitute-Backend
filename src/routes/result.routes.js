const express = require('express');
// Static results data for demo (can be moved to DB)
const resultsData = [
  { name: 'जय भाबडी', percentage: '98.50%' },
  { name: 'अक्षता सोनटक्के', percentage: '98.48%' },
  { name: 'भावना जागळे', percentage: '95.92%' },
  { name: 'मनीषा दलवी', percentage: '94.00%' },
  { name: 'एश्वर्या दलवी', percentage: '92.76%' },
  { name: 'प्रतिक्षा कांबळे', percentage: '87.78%' },
  { name: 'प्रथमेश पांचाल', percentage: '87.45%' },
  { name: 'शुद्धा स्वामी', percentage: '86.40%' },
  { name: 'प्रथमेश पांचाल', percentage: '79.45%' },
  { name: 'समृद्धी रंगावकर', percentage: '78.93%' },
  { name: 'शिवप्रसाद यशवंते', percentage: '77.11%' },
  { name: 'पायल शिंदे', percentage: '77.11%' },
];
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, results: resultsData });
});

module.exports = router;