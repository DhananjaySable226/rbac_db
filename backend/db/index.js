const { Sequelize } = require('sequelize')
const path = require('path')

const sequelize = new Sequelize(
    process.env.DB_NAME || 'rbac_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: Number(process.env.DB_PORT || 5432),
        logging: false,
    }
)

async function connectAndSync() {
    await sequelize.authenticate()
    // Import models
    require('../model/User')
    await sequelize.sync({ alter: true })
}

async function seedUsers() {
    const { seedDefaultUsers } = require('../service/userService')
    await seedDefaultUsers()
}

module.exports = { sequelize, connectAndSync, seedUsers }


