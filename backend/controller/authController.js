const jwt = require('jsonwebtoken')
const { findUserByEmail, verifyPassword } = require('../service/userService')

async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required' })
        }

        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const ok = await verifyPassword(password, user.password)
        if (!ok) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const payload = { id: user.id, role: user.role, email: user.email, name: user.name }
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '1d' })
        return res.json({ token, role: user.role, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
    } catch (error) {
        console.error('Login error', error)
        return res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { login }


