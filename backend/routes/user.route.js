const express = require('express');
const router = express.Router();
const upload = require('../multer.config.js');
const {body, param} = require('express-validator');
const UserController = require('../controllers/user.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');
const sendMail = require('../services/mail.service.js');
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 letters long'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long'),
],UserController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Enter the valid email please'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long')
],UserController.loginUser);

router.post('/ride/create',[
    body('pickupLocation').notEmpty().withMessage('pickup Location is mandatory'),
    body('dropLocation').notEmpty().withMessage('dropLocation is mandatory'),
    body('fare').notEmpty().withMessage('fare is mandatory'),
    body('vehicleType').notEmpty().withMessage('vehicleType is mandatory'),
],authMiddleware,UserController.createRide);

router.get('/ride/cancel/:ride_id',authMiddleware,UserController.cancelRide);

router.get('/profile',authMiddleware,UserController.getProfile);
router.get('/logout',authMiddleware,UserController.logoutUser);
router.post('/socket_id',[param('id').notEmpty().withMessage('Socket id is mandatory!')],authMiddleware,UserController.updateSocketId);
router.post('/profile',authMiddleware,upload.single("image"),UserController.updateProfile);
router.post('/password/update',[
    body('newPassword').notEmpty().withMessage('New password is mandatory'),
    body('oldPassword').notEmpty().withMessage('Old password is mandatory'),
],authMiddleware,UserController.updatePassword);

router.post('/account/deactivate',authMiddleware,UserController.deactivateAccount);
router.get('/ride/history',authMiddleware,UserController.getRideHistory);
router.get('/mail',sendMail);
router.get('/ride/check',authMiddleware,UserController.getCurrentRide);
router.get('/ride/details/:rideId',authMiddleware,UserController.getRideDetails);
router.get('/verify/:token',UserController.verifyEmail);
module.exports = router;