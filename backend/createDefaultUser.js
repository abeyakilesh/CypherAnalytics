require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fintech-privacy-monitor';

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        const email = 'abeyakilesh@gmail.com';
        const password = 'password123';
        
        const existing = await User.findOne({ email });
        if (existing) {
            console.log('User already exists');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const user = new User({
                name: 'Abeyakilesh',
                email: email,
                password: hashedPassword,
                role: 'admin'
            });
            await user.save();
            console.log('Default admin user created: abeyakilesh@gmail.com / password123');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.disconnect();
    }
}
createAdmin();
