const express = require('express');
const router = express.Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserStats,
} = require('../controllers/userController');

const auth = require('../middleware/auth');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/stats', getUserStats);

module.exports = router;