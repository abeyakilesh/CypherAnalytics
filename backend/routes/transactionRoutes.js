const express = require('express');
const router = express.Router();
const { roleMiddleware } = require('../middleware/authMiddleware');
const {
    getTransactions,
    getAlerts,
    getAnalytics,
    getPrivacyInfo,
    getSettings
} = require('../controllers/transactionController');

router.use(roleMiddleware);

router.get('/transactions', getTransactions);
router.get('/alerts', getAlerts);
router.get('/analytics', getAnalytics);
router.get('/privacy', getPrivacyInfo);
router.get('/settings', getSettings);

module.exports = router;
