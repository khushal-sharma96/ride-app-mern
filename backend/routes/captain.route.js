const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const CaptainController = require('../controllers/captain.controller.js');
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 letters long'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long'),
    body('vehicleType').isLength({min:1}).withMessage('Vehicle Type is mandatory'),
    body('vehicleNumber')
],CaptainController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Enter the valid email please'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long')
],CaptainController.loginUser);

module.exports = router;