require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Connect using existing project configuration (fallback to fintechDB if no env variable is set)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fintechDB';

// Data Arrays for Generation
const MERCHANTS = ['Amazon', 'Flipkart', 'Swiggy', 'Zomato', 'Uber', 'Netflix'];
const LOCATIONS = ['Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Singapore', 'Dubai'];

// Helper Functions
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateRandomUser() {
    const userNum = getRandomNumber(1, 1000);
    return `U${userNum.toString().padStart(4, '0')}`;
}

function generateAccountNumber() {
    const p1 = getRandomNumber(1000, 9999);
    const p2 = getRandomNumber(1000, 9999);
    const p3 = getRandomNumber(1000, 9999);
    return `${p1}-${p2}-${p3}`;
}

// Database Connection
async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB via Project Configuration');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
}

// Mongoose Schema Configuration
const transactionSchema = new mongoose.Schema({
    transactionID: { type: String, required: true },
    userID: { type: String, required: true },
    accountNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    merchant: { type: String, required: true },
    location: { type: String, required: true },
    timestamp: { type: Date, required: true },
    riskScore: { type: Number, required: true },

    // Additional fields mapped for compatibility with the existing platform
    userName: { type: String, default: "Synthetic User" },
    status: { type: String }
}, { collection: 'transactions' });

const Transaction = mongoose.model('SyntheticTransaction', transactionSchema);

// Transaction Generation Logic
function createSyntheticTransaction() {
    // 90% normal, 10% suspicious
    const isSuspicious = Math.random() < 0.10;

    let amount;
    let riskScore;
    let location = getRandomElement(LOCATIONS);

    if (isSuspicious) {
        amount = getRandomNumber(20000, 100000); // Very high amount > ₹20000
        riskScore = getRandomNumber(70, 100);
        // Simulate unusual location change
        if (Math.random() < 0.3) location = 'Unknown / Foreign IP';
    } else {
        amount = getRandomNumber(100, 5000);
        riskScore = getRandomNumber(10, 40);
    }

    return {
        transactionID: uuidv4(),
        userID: generateRandomUser(),
        accountNumber: generateAccountNumber(),
        amount: amount,
        merchant: getRandomElement(MERCHANTS),
        location: location,
        timestamp: new Date(),
        riskScore: riskScore,
        userName: `User ${generateRandomUser()}`, // For UI display compatibility
        status: isSuspicious ? 'suspicious' : 'normal'
    };
}

// Service Execution
async function startGenerator() {
    await connectDB();
    console.log('🚀 Synthetic transaction generator started.');
    console.log('Generating realistic financial traffic...');

    // Continuous execution loop
    const generateLoop = async () => {
        try {
            const data = createSyntheticTransaction();
            const transaction = new Transaction(data);
            await transaction.save();

            if (data.riskScore >= 70) {
                console.log(`⚠️ Suspicious transaction detected: ${data.transactionID} | Risk: ${data.riskScore} | Amt: ₹${data.amount}`);
            } else {
                console.log(`✅ New transaction generated: ${data.transactionID} | Amt: ₹${data.amount}`);
            }
        } catch (error) {
            console.error('❌ Error inserting transaction:', error.message);
        }

        // Generate between 1 and 2 seconds
        const nextDelay = getRandomNumber(1000, 2000);
        setTimeout(generateLoop, nextDelay);
    };

    generateLoop();
}

startGenerator();
