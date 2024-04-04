const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Create Product
router.post('/', productController.createProduct);

// Update Product
router.put('/:id', productController.updateProduct);

// Get all Products
router.get('/', productController.getAllProducts);

// Get Product by ID
router.get('/:id', productController.getProductById);

// Delete Product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
