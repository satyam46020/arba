const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Define routes
router.post('/', cartController.createCartItem);
router.patch('/:id', cartController.updateCartItem);
router.get('/', cartController.getAllCartItems);

module.exports = router;
