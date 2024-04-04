const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.post('/register', userController.createUser);

router.post('/login', userController.login);

router.post('/forgot-password', userController.emailVerification);

router.patch('/forgot-password', userController.updatePassword)

router.patch('/profile',auth, userController.updateProfile);

module.exports = router;
