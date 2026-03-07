const User = require('../models/User');
const crypto = require('crypto');

// Get security settings & API keys
exports.getSecuritySettings = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('securitySettings apiKeys');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.json({
            success: true,
            data: {
                securitySettings: user.securitySettings,
                apiKeys: user.apiKeys
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update security settings (2FA, Login Alerts)
exports.updateSecuritySettings = async (req, res) => {
    try {
        const { twoFactor, loginAlerts } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (twoFactor !== undefined) user.securitySettings.twoFactor = twoFactor;
        if (loginAlerts !== undefined) user.securitySettings.loginAlerts = loginAlerts;

        await user.save();
        res.json({ success: true, data: user.securitySettings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Generate a new API Key
exports.generateApiKey = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        // Create a unique key
        const newKey = 'ca_' + crypto.randomBytes(32).toString('hex');
        const keyObj = {
            key: newKey,
            name: `Key Generated ${new Date().toLocaleDateString()}`
        };

        user.apiKeys.push(keyObj);
        await user.save();

        res.json({ success: true, data: keyObj });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Revoke an API Key
exports.revokeApiKey = async (req, res) => {
    try {
        const { keyId } = req.params;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        user.apiKeys = user.apiKeys.filter(k => k._id.toString() !== keyId);
        await user.save();

        res.json({ success: true, message: 'API key revoked' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
