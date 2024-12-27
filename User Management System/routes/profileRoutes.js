const express = require('express');
const { updateProfile, changePassword, getProfileById, getAllUsers, deleteUser, updateRole } = require('../controllers/profileController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/update', verifyToken, updateProfile);
router.put('/change-password', verifyToken, changePassword);
router.get('/userProfile', verifyToken, getProfileById);
router.get('/getAllUser', verifyToken, getAllUsers);
router.delete('/user/:id', verifyToken, deleteUser);
router.put('/user/:id', verifyToken, updateRole);

module.exports = router;