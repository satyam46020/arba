const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.createUser);

router.post('/login', userController.login);

router.post('/forgot-password', userController.forgotPassword);

router.put('/profile', userController.updateProfile);

module.exports = router;
