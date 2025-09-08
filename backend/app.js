const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const { sequelize, connectAndSync, seedUsers } = require('./db/index')
const authRoutes = require('./route/authRoutes')
const protectedRoutes = require('./route/protectedRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'rbac-backend' })
})

app.use('/api', authRoutes)
app.use('/api', protectedRoutes)

const PORT = process.env.PORT || 4000

async function start() {
    try {
        await connectAndSync()
        await seedUsers()
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

start()


module.exports = app


