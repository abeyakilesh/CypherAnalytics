const Transaction = require('../models/Transaction');
const { applyBatchMasking, applyPrivacyMasking } = require('../services/privacyService');
const { decryptSensitiveFields } = require('../services/encryptionService');
const { getExplainablePrivacy, getPrivacyScore, classifyAllFields } = require('../services/sensitiveDataDetector');
const { getRoles } = require('../middleware/authMiddleware');

// GET /api/transactions
async function getTransactions(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const transactions = await Transaction.find()
            .sort({ timestamp: -1 })
            .limit(limit)
            .lean();

        let processed;
        if (req.userRole === 'admin') {
            processed = transactions.map(t => decryptSensitiveFields(t));
        } else {
            processed = transactions.map(t => {
                const decrypted = decryptSensitiveFields(t);
                return applyPrivacyMasking(decrypted, req.userRole);
            });
        }

        res.json({ success: true, count: processed.length, data: processed });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// GET /api/alerts
async function getAlerts(req, res) {
    try {
        const alerts = await Transaction.find({ riskScore: { $gt: 70 } })
            .sort({ timestamp: -1 })
            .limit(30)
            .lean();

        const processed = alerts.map(t => {
            const decrypted = decryptSensitiveFields(t);
            return applyPrivacyMasking(decrypted, req.userRole);
        });

        res.json({ success: true, count: processed.length, data: processed });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// GET /api/analytics
async function getAnalytics(req, res) {
    try {
        const totalTransactions = await Transaction.countDocuments();
        const suspiciousCount = await Transaction.countDocuments({ status: 'suspicious' });
        const avgRisk = await Transaction.aggregate([
            { $group: { _id: null, avg: { $avg: '$riskScore' }, totalVolume: { $sum: '$amount' } } }
        ]);

        // Transaction volume over time (last 20 time windows)
        const volumeOverTime = await Transaction.aggregate([
            { $sort: { timestamp: -1 } },
            { $limit: 100 },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%H:%M:%S', date: '$timestamp' }
                    },
                    count: { $sum: 1 },
                    volume: { $sum: '$amount' }
                }
            },
            { $sort: { _id: 1 } },
            { $limit: 20 }
        ]);

        // Risk distribution
        const riskDistribution = await Transaction.aggregate([
            {
                $bucket: {
                    groupBy: '$riskScore',
                    boundaries: [0, 20, 40, 60, 80, 101],
                    default: 'Other',
                    output: { count: { $sum: 1 } }
                }
            }
        ]);

        // Top merchants
        const topMerchants = await Transaction.aggregate([
            { $group: { _id: '$merchant', count: { $sum: 1 }, volume: { $sum: '$amount' } } },
            { $sort: { count: -1 } },
            { $limit: 8 }
        ]);

        // Location distribution
        const locationDistribution = await Transaction.aggregate([
            { $group: { _id: '$location', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 8 }
        ]);

        const avgAmountVal = avgRisk[0] ? avgRisk[0].totalVolume / totalTransactions : 0;

        res.json({
            success: true,
            data: {
                totalTransactions,
                suspiciousTransactions: suspiciousCount,
                transactionVolume: avgRisk[0]?.totalVolume || 0,
                averageRiskScore: Math.round(avgRisk[0]?.avg || 0),
                avgAmount: avgAmountVal || 0,
                volumeOverTime: volumeOverTime.map(v => ({ time: v._id, count: v.count, volume: v.volume })),
                riskDistribution: riskDistribution.map(r => ({
                    range: r._id === 0 ? '0-19' : r._id === 20 ? '20-39' : r._id === 40 ? '40-59' : r._id === 60 ? '60-79' : '80-100',
                    count: r.count
                })),
                topMerchants: topMerchants.map(m => ({ merchant: m._id, count: m.count, volume: Math.round(m.volume) })),
                locationDistribution: locationDistribution.map(l => ({ location: l._id, count: l.count }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// GET /api/privacy
async function getPrivacyInfo(req, res) {
    try {
        const privacyScore = getPrivacyScore();
        const explainablePrivacy = getExplainablePrivacy();
        const sampleTransaction = {
            transactionID: 'TXN-SAMPLE',
            userID: 'USR-1001',
            userName: 'Alice Johnson',
            accountNumber: '4532-8891-0023-2391',
            amount: 150.75,
            merchant: 'Amazon',
            location: 'New York, USA'
        };
        const classifications = classifyAllFields(sampleTransaction);

        res.json({
            success: true,
            data: {
                privacyScore,
                fieldClassifications: classifications,
                explainablePrivacy,
                protectionSummary: {
                    encryptionMethod: 'AES-256-CBC',
                    sensitiveFieldsEncrypted: ['accountNumber', 'userName'],
                    maskingApplied: true,
                    roleBasedAccess: true
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// GET /api/settings
async function getSettings(req, res) {
    try {
        const roles = getRoles();
        res.json({
            success: true,
            data: {
                currentRole: req.userRole,
                availableRoles: roles,
                systemStatus: 'operational',
                encryptionEnabled: true,
                privacyMaskingEnabled: true,
                realTimeMonitoring: true,
                transactionGeneratorActive: true,
                mongoDBConnected: true
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { getTransactions, getAlerts, getAnalytics, getPrivacyInfo, getSettings };
