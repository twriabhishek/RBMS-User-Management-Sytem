const express = require('express');
const { createRole, getRoles, updateRole, deleteRole, getRolesById } = require('../controllers/roleController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', verifyToken, checkRole(['Admin']), createRole);
router.get('/', verifyToken, checkRole(['Admin']), getRoles);
router.get('/:id', verifyToken, checkRole(['Admin']), getRolesById);
router.put('/:id', verifyToken, checkRole(['Admin']), updateRole);
router.delete('/:id', verifyToken, checkRole(['Admin']), deleteRole);

module.exports = router;