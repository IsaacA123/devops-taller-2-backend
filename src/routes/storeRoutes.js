const express = require('express');
const router = express.Router();
const { createStore, getAllStores, createEmployee, getEmployees } = require('../controllers/storeController');
const { createProduct, updateProduct, getAllProductsByStoreId, getProductById, updateProductStock, deleteProduct } = require('../controllers/productController');
const { authMiddleware, authorizeRole } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createStore);
router.get('/', authMiddleware, getAllStores);
router.post('/:storeId/employees', authMiddleware, authorizeRole(['admin', 'owner']), createEmployee);
router.get('/:storeId/employees', authMiddleware, authorizeRole(['admin', 'owner']), getEmployees);
router.post('/:storeId/products', authMiddleware, authorizeRole(['admin', 'owner']), createProduct);
router.get('/:storeId/products', authMiddleware, authorizeRole(['admin', 'owner', 'employee']), getAllProductsByStoreId);
router.get('/:storeId/products/:productId', authMiddleware, authorizeRole(['admin', 'owner',  'employee']), getProductById);
router.delete('/:storeId/products/:productId', authMiddleware, authorizeRole(['admin', 'owner']), deleteProduct);
router.put('/:storeId/products/:productId', authMiddleware, authorizeRole(['admin', 'owner']), updateProduct);
router.put('/:storeId/products/:productId/stock', authMiddleware, authorizeRole(['admin', 'owner', 'employee']), updateProductStock);

module.exports = router;
