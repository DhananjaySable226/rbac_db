const bcrypt = require('bcryptjs')
const User = require('../model/User')

async function hashPassword(plain) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(plain, salt)
}

async function verifyPassword(plain, hashed) {
    return bcrypt.compare(plain, hashed)
}

async function findUserByEmail(email) {
    return User.findOne({ where: { email } })
}

async function createUser({ name, email, password, role }) {
    const hashed = await hashPassword(password)
    return User.create({ name, email, password: hashed, role })
}

async function seedDefaultUsers() {
    const defaults = [
        { name: 'Super Admin', email: 'superadmin@test.com', role: 'SuperAdmin', password: 'password' },
        { name: 'Admin', email: 'admin@test.com', role: 'Admin', password: 'password' },
        { name: 'HR', email: 'hr@test.com', role: 'HR', password: 'password' },
        { name: 'Sales', email: 'sales@test.com', role: 'Sales', password: 'password' },
        { name: 'Support', email: 'support@test.com', role: 'SupportAgent', password: 'password' },
    ]

    for (const u of defaults) {
        const exists = await findUserByEmail(u.email)
        if (!exists) {
            await createUser(u)
        }
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    findUserByEmail,
    createUser,
    seedDefaultUsers,
}


