const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controllers');

// Create Category
router.post('/', categoryController.createCategory);

// Update Category
router.put('/:id', categoryController.updateCategory);

// Get all Categories
router.get('/', categoryController.getAllCategories);

// Get Category by ID
router.get('/:id', categoryController.getCategoryById);

// Delete Category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
