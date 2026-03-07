// Risk Detection Engine
// Analyzes transactions in real-time for suspicious behavior

const { getUserHistory } = require('./transactionGenerator');

const HIGH_AMOUNT_THRESHOLD = 5000;
const RAPID_TRANSACTION_WINDOW_MS = 60000; // 1 minute
const RAPID_TRANSACTION_COUNT = 3;

const highRiskLocations = [
    'Lagos, Nigeria', 'Moscow, Russia', 'Panama City, Panama',
    'Cayman Islands', 'Hong Kong, China'
];

const suspiciousMerchants = [
    'Wire Transfer', 'International Wire', 'Crypto Exchange',
    'Offshore Holdings', 'Western Union'
];

function analyzeTransaction(transaction) {
    let riskScore = 0;
    const riskFactors = [];

    // 1. High amount check
    if (transaction.amount > HIGH_AMOUNT_THRESHOLD) {
        const amountRisk = Math.min(35, Math.round((transaction.amount / 25000) * 35));
        riskScore += amountRisk;
        riskFactors.push({
            factor: 'High Transaction Amount',
            detail: `$${transaction.amount.toLocaleString()} exceeds threshold of $${HIGH_AMOUNT_THRESHOLD}`,
            impact: amountRisk
        });
    }

    // 2. Suspicious merchant check
    if (suspiciousMerchants.includes(transaction.merchant)) {
        riskScore += 20;
        riskFactors.push({
            factor: 'Suspicious Merchant',
            detail: `${transaction.merchant} flagged as high-risk merchant category`,
            impact: 20
        });
    }

    // 3. High-risk location check
    if (highRiskLocations.includes(transaction.location)) {
        riskScore += 20;
        riskFactors.push({
            factor: 'High-Risk Location',
            detail: `Transaction from ${transaction.location} - flagged jurisdiction`,
            impact: 20
        });
    }

    // 4. Rapid repeated transactions
    const history = getUserHistory(transaction.userID);
    const now = Date.now();
    const recentCount = history.filter(h =>
        (now - h.timestamp) < RAPID_TRANSACTION_WINDOW_MS
    ).length;

    if (recentCount >= RAPID_TRANSACTION_COUNT) {
        riskScore += 15;
        riskFactors.push({
            factor: 'Rapid Repeated Transactions',
            detail: `${recentCount} transactions within ${RAPID_TRANSACTION_WINDOW_MS / 1000}s window`,
            impact: 15
        });
    }

    // 5. Location velocity check (sudden location change)
    if (history.length >= 2) {
        const lastLocation = history[history.length - 2]?.location;
        if (lastLocation && lastLocation !== transaction.location) {
            const timeDiff = now - history[history.length - 2].timestamp;
            if (timeDiff < 300000) { // 5 minutes
                riskScore += 15;
                riskFactors.push({
                    factor: 'Location Velocity Anomaly',
                    detail: `Location changed from ${lastLocation} to ${transaction.location} in ${Math.round(timeDiff / 1000)}s`,
                    impact: 15
                });
            }
        }
    }

    // Add small random noise for realism
    riskScore += Math.floor(Math.random() * 5);
    riskScore = Math.min(100, Math.max(0, riskScore));

    const status = riskScore > 70 ? 'suspicious' : 'normal';

    return {
        ...transaction,
        riskScore,
        status,
        riskFactors
    };
}

module.exports = { analyzeTransaction };
