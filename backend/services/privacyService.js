// Privacy Protection Layer
// Masks and anonymizes data before sending to frontend

function maskAccountNumber(accountNumber) {
    if (!accountNumber) return 'XXXX-XXXX-XXXX-XXXX';
    const clean = accountNumber.replace(/[^0-9]/g, '');
    if (clean.length < 4) return 'XXXX-XXXX-XXXX-XXXX';
    const lastFour = clean.slice(-4);
    return `XXXX-XXXX-XXXX-${lastFour}`;
}

function anonymizeUserName(userName, userID) {
    if (!userID) return 'User_0000';
    const idNum = userID.replace(/[^0-9]/g, '');
    return `User_${idNum}`;
}

function applyPrivacyMasking(transaction, role = 'analyst') {
    const base = transaction.toObject ? transaction.toObject() : { ...transaction };

    switch (role) {
        case 'admin':
            // Admin gets encrypted raw values (already encrypted in DB)
            return base;

        case 'analyst':
            // Analyst gets masked identifiers
            return {
                ...base,
                accountNumber: maskAccountNumber(base.accountNumber),
                userName: anonymizeUserName(base.userName, base.userID)
            };

        case 'viewer':
            // Viewer gets aggregated only - no individual identifiers
            return {
                transactionID: base.transactionID,
                amount: base.amount,
                merchant: base.merchant,
                location: base.location,
                timestamp: base.timestamp,
                riskScore: base.riskScore,
                status: base.status,
                accountNumber: 'XXXX-XXXX-XXXX-XXXX',
                userName: 'Redacted',
                userID: 'Redacted'
            };

        default:
            return {
                ...base,
                accountNumber: maskAccountNumber(base.accountNumber),
                userName: anonymizeUserName(base.userName, base.userID)
            };
    }
}

function applyBatchMasking(transactions, role = 'analyst') {
    return transactions.map(t => applyPrivacyMasking(t, role));
}

module.exports = { maskAccountNumber, anonymizeUserName, applyPrivacyMasking, applyBatchMasking };
