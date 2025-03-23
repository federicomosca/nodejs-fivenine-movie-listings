const express = require('express')
const User = require('../models/user.model')
const { getUsers, getUser, createUser, updateUser, deleteUser, register, login } = require('../controllers/user.controller')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/', getUsers)
router.get('/:id', getUser)

router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router