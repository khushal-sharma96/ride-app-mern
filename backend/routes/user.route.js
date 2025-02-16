const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const UserController = require('../controllers/user.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 letters long'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long'),
],UserController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Enter the valid email please'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long')
],UserController.loginUser);

router.get('/profile',authMiddleware,UserController.getProfile);
router.get('/logout',authMiddleware,UserController.logoutUser);

module.exports = router;