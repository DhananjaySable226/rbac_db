const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    const auth = req.headers.authorization || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
    if (!token) return res.status(401).json({ message: 'Missing token' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

function permit(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: 'Unauthenticated' })
        if (req.user.role === 'SuperAdmin') return next()
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        next()
    }
}

module.exports = { authenticate, permit }


