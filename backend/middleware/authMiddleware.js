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
    // Role comes from header (in production, this would be from JWT)
    const role = req.headers['x-user-role'] || 'analyst';

    if (!ROLES[role]) {
        return res.status(403).json({ error: 'Invalid role' });
    }

    req.userRole = role;
    req.roleConfig = ROLES[role];
    next();
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
