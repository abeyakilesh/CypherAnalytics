const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'fintech-privacy-monitor-secret-2024';

// Role-Based Access Control Middleware

const ROLES = {
    admin: {
        level: 3,
        description: 'Full access to encrypted raw data',
        permissions: ['read', 'write', 'decrypt', 'admin']
    },
    analyst: {
        level: 2,
        description: 'Access to masked identifiers',
        permissions: ['read', 'analyze']
    },
    viewer: {
        level: 1,
        description: 'Aggregated insights only',
        permissions: ['read']
    }
};

function roleMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    // For local dev/compatibility if no token is strictly provided yet, fallback to header
    if (!authHeader) {
        const role = req.headers['x-user-role'] || 'analyst';
        if (!ROLES[role]) return res.status(403).json({ error: 'Invalid role' });
        req.userRole = role;
        req.roleConfig = ROLES[role];
        return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        const role = decoded.user.role || req.headers['x-user-role'] || 'analyst';

        if (!ROLES[role]) {
            return res.status(403).json({ error: 'Invalid role' });
        }

        req.userRole = role;
        req.roleConfig = ROLES[role];
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

function requireRole(minRole) {
    const roleLevels = { viewer: 1, analyst: 2, admin: 3 };
    return (req, res, next) => {
        const userLevel = roleLevels[req.userRole] || 0;
        const requiredLevel = roleLevels[minRole] || 0;

        if (userLevel < requiredLevel) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                required: minRole,
                current: req.userRole
            });
        }
        next();
    };
}

function getRoles() {
    return ROLES;
}

module.exports = { roleMiddleware, requireRole, getRoles, ROLES };
