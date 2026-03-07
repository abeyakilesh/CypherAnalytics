const { v4: uuidv4 } = require('uuid');

const merchants = [
    'Amazon', 'Walmart', 'Starbucks', 'Apple Store', 'Target', 'Best Buy',
    'Netflix', 'Uber', 'Spotify', 'McDonald\'s', 'Whole Foods', 'Gas Station',
    'Wire Transfer', 'International Wire', 'Crypto Exchange', 'Luxury Watches Ltd',
    'Offshore Holdings', 'Jewelry Store', 'PayPal Transfer', 'Western Union'
];

const locations = [
    'New York, USA', 'San Francisco, USA', 'Chicago, USA', 'Los Angeles, USA',
    'Boston, USA', 'Dallas, USA', 'Austin, USA', 'Miami, USA', 'Seattle, USA',
    'London, UK', 'Tokyo, Japan', 'Seoul, South Korea', 'Mumbai, India',
    'Dubai, UAE', 'Lagos, Nigeria', 'Moscow, Russia', 'Zurich, Switzerland',
    'Panama City, Panama', 'Cayman Islands', 'Hong Kong, China'
];

const users = [
    { userID: 'USR-1001', userName: 'Alice Johnson', accountNumber: '4532-8891-0023-2391' },
    { userID: 'USR-1002', userName: 'Robert Smith', accountNumber: '5214-7723-4456-8810' },
    { userID: 'USR-1003', userName: 'Maria Garcia', accountNumber: '3782-1200-5543-9912' },
    { userID: 'USR-1004', userName: 'James Wilson', accountNumber: '6011-4422-8890-1155' },
    { userID: 'USR-1005', userName: 'Sarah Chen', accountNumber: '4916-3300-7712-4489' },
    { userID: 'USR-1006', userName: 'Emily Davis', accountNumber: '3456-7890-1234-5678' },
    { userID: 'USR-1007', userName: 'David Kim', accountNumber: '4000-1234-5678-9010' },
    { userID: 'USR-1008', userName: 'Priya Patel', accountNumber: '5500-0000-0000-0004' },
    { userID: 'USR-1009', userName: 'Michael Brown', accountNumber: '4111-1111-1111-1111' },
    { userID: 'USR-1010', userName: 'Linda Martinez', accountNumber: '5105-1051-0510-5100' }
];

const suspiciousMerchants = ['Wire Transfer', 'International Wire', 'Crypto Exchange', 'Offshore Holdings', 'Western Union'];
const highRiskLocations = ['Lagos, Nigeria', 'Moscow, Russia', 'Panama City, Panama', 'Cayman Islands'];

// Track recent transactions per user for pattern detection
const recentTransactions = new Map();

function generateTransaction() {
    const isSuspicious = Math.random() < 0.15;
    const user = users[Math.floor(Math.random() * users.length)];
    let amount, merchant, location;

    if (isSuspicious) {
        const suspiciousType = Math.floor(Math.random() * 3);
        switch (suspiciousType) {
            case 0: // Large amount
                amount = parseFloat((5000 + Math.random() * 20000).toFixed(2));
                merchant = suspiciousMerchants[Math.floor(Math.random() * suspiciousMerchants.length)];
                location = locations[Math.floor(Math.random() * locations.length)];
                break;
            case 1: // Suspicious location
                amount = parseFloat((100 + Math.random() * 5000).toFixed(2));
                merchant = merchants[Math.floor(Math.random() * merchants.length)];
                location = highRiskLocations[Math.floor(Math.random() * highRiskLocations.length)];
                break;
            case 2: // Rapid repeat
                amount = parseFloat((50 + Math.random() * 500).toFixed(2));
                merchant = merchants[Math.floor(Math.random() * 12)]; // Normal merchants
                location = locations[Math.floor(Math.random() * 9)]; // US locations
                break;
        }
    } else {
        amount = parseFloat((5 + Math.random() * 500).toFixed(2));
        merchant = merchants[Math.floor(Math.random() * 12)]; // Normal merchants only
        location = locations[Math.floor(Math.random() * 9)]; // US locations only
    }

    const transaction = {
        transactionID: `TXN-${uuidv4().slice(0, 8).toUpperCase()}`,
        userID: user.userID,
        userName: user.userName,
        accountNumber: user.accountNumber,
        amount,
        merchant,
        location,
        timestamp: new Date().toISOString()
    };

    // Track for pattern detection
    const userHistory = recentTransactions.get(user.userID) || [];
    userHistory.push({ timestamp: Date.now(), location, amount });
    if (userHistory.length > 10) userHistory.shift();
    recentTransactions.set(user.userID, userHistory);

    return transaction;
}

function getUserHistory(userID) {
    return recentTransactions.get(userID) || [];
}

module.exports = { generateTransaction, getUserHistory };
