const crypto = require('crypto');
require('dotenv').config();

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = Buffer.from(process.env.AES_SECRET_KEY, 'hex');
const IV = Buffer.from(process.env.AES_IV, 'hex');

function encrypt(text) {
    if (!text) return text;
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(text) {
    if (!text) return text;
    try {
        const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, IV);
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch {
        return text; // Return as-is if already plaintext
    }
}

function encryptSensitiveFields(transaction) {
    return {
        ...transaction,
        accountNumber: encrypt(transaction.accountNumber),
        userName: encrypt(transaction.userName)
    };
}

function decryptSensitiveFields(transaction) {
    const obj = transaction.toObject ? transaction.toObject() : { ...transaction };
    return {
        ...obj,
        accountNumber: decrypt(obj.accountNumber),
        userName: decrypt(obj.userName)
    };
}

module.exports = { encrypt, decrypt, encryptSensitiveFields, decryptSensitiveFields };
