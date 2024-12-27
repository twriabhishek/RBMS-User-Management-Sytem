const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', verifyToken, checkRole(['Admin']), createProduct);
router.get('/', verifyToken, checkRole(['Admin', 'Supervisor', 'User']), getProducts);
router.get('/:id', verifyToken, checkRole(['Admin', 'Supervisor', 'User']), getProductById);
router.put('/:id', verifyToken, checkRole(['Admin', 'Supervisor']), updateProduct);
router.delete('/:id', verifyToken, checkRole(['Admin']), deleteProduct);

module.exports = router;