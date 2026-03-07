require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const transactionRoutes = require('./routes/transactionRoutes');
const { generateTransaction } = require('./services/transactionGenerator');
const { encryptSensitiveFields, decryptSensitiveFields } = require('./services/encryptionService');
const { applyPrivacyMasking } = require('./services/privacyService');
const { analyzeTransaction } = require('./services/riskEngine');
const Transaction = require('./models/Transaction');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', transactionRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'operational', timestamp: new Date().toISOString() });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fintech-privacy-monitor';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));

// In-memory stats
let stats = {
    totalTransactions: 0,
    suspiciousTransactions: 0,
    totalVolume: 0,
    riskScoreSum: 0
};

// Load initial stats from DB
async function loadStats() {
    try {
        const count = await Transaction.countDocuments();
        const suspicious = await Transaction.countDocuments({ status: 'suspicious' });
        const agg = await Transaction.aggregate([
            { $group: { _id: null, vol: { $sum: '$amount' }, riskSum: { $sum: '$riskScore' } } }
        ]);
        stats.totalTransactions = count;
        stats.suspiciousTransactions = suspicious;
        stats.totalVolume = agg[0]?.vol || 0;
        stats.riskScoreSum = agg[0]?.riskSum || 0;
    } catch (err) {
        console.log('Stats will initialize from zero');
    }
}

// WebSocket Connection
io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Send current stats on connect
    socket.emit('stats', {
        totalTransactions: stats.totalTransactions,
        suspiciousTransactions: stats.suspiciousTransactions,
        transactionVolume: stats.totalVolume,
        averageRiskScore: stats.totalTransactions > 0
            ? Math.round(stats.riskScoreSum / stats.totalTransactions) : 0
    });

    socket.on('disconnect', () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);
    });

    // Allow role change from client
    socket.on('setRole', (role) => {
        socket.userRole = role;
        console.log(`👤 Client ${socket.id} role set to: ${role}`);
    });
});

// Transaction Generation Loop
let generatorInterval;

function startTransactionGenerator() {
    const generate = async () => {
        try {
            // Generate raw transaction
            const rawTransaction = generateTransaction();

            // Run risk analysis
            const analyzedTransaction = analyzeTransaction(rawTransaction);

            // Encrypt sensitive fields for storage
            const encryptedTransaction = encryptSensitiveFields(analyzedTransaction);

            // Save to MongoDB
            const saved = await Transaction.create(encryptedTransaction);

            // Update stats
            stats.totalTransactions++;
            stats.totalVolume += analyzedTransaction.amount;
            stats.riskScoreSum += analyzedTransaction.riskScore;
            if (analyzedTransaction.status === 'suspicious') {
                stats.suspiciousTransactions++;
            }

            // Send masked transaction to all connected clients
            const maskedTransaction = applyPrivacyMasking(analyzedTransaction, 'analyst');

            io.emit('newTransaction', maskedTransaction);

            // Send updated stats
            io.emit('stats', {
                totalTransactions: stats.totalTransactions,
                suspiciousTransactions: stats.suspiciousTransactions,
                transactionVolume: Math.round(stats.totalVolume),
                averageRiskScore: Math.round(stats.riskScoreSum / stats.totalTransactions)
            });

            // Emit alert if suspicious
            if (analyzedTransaction.riskScore > 70) {
                const maskedAlert = applyPrivacyMasking(analyzedTransaction, 'analyst');
                io.emit('fraudAlert', maskedAlert);
            }

            console.log(`📊 TXN ${analyzedTransaction.transactionID} | $${analyzedTransaction.amount} | Risk: ${analyzedTransaction.riskScore} | ${analyzedTransaction.status}`);
        } catch (error) {
            console.error('Transaction generation error:', error.message);
        }

        // Schedule next transaction (1-2 seconds)
        const delay = 1000 + Math.random() * 1000;
        generatorInterval = setTimeout(generate, delay);
    };

    generate();
}

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await loadStats();
    startTransactionGenerator();
    console.log(`📡 Transaction generator started`);
    console.log(`🔒 Privacy protection layer active`);
    console.log(`🛡️  Risk detection engine online`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    clearTimeout(generatorInterval);
    mongoose.connection.close();
    console.log('\n🛑 Server shutdown');
    process.exit(0);
});
