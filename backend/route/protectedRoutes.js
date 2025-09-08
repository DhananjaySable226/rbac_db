const express = require('express')
const { authenticate, permit } = require('../middelware/authMiddleware')

const router = express.Router()

router.get('/admin', authenticate, permit('Admin'), (req, res) => {
    res.json({ message: 'Welcome Admin', user: req.user })
})

router.get('/hr', authenticate, permit('HR'), (req, res) => {
    res.json({ message: 'Welcome HR', user: req.user })
})

router.get('/support', authenticate, permit('SupportAgent'), (req, res) => {
    res.json({ message: 'Welcome SupportAgent', user: req.user })
})

module.exports = router


