const express = require('express');
const router = express.Router();
const {
  register,
  login,
  profile,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

const auth = require('../middleware/auth.middleware');

// Rotte pubbliche
router.post('/register', register);
router.post('/login', login);

// Rotta protetta
router.get('/profile', auth, profile);

// Altre rotte (admin/dev)
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
