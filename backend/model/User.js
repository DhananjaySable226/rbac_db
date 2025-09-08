const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/index')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('SuperAdmin', 'Admin', 'HR', 'Sales', 'SupportAgent'),
            allowNull: false,
            defaultValue: 'Sales',
        },
    },
    {
        tableName: 'users',
    }
)

module.exports = User


