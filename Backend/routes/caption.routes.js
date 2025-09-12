const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const captionController = require('../controller/caption.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First Name is required'),
    body('fullname.lastname').notEmpty().withMessage('Last Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
], captionController.registerCaption);



router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captionController.loginCaption);

router.get('/profile', authMiddleware.authCaption,captionController.getCaptionProfile);

router.get('/logout', authMiddleware.authCaption,captionController.logoutCaption);

module.exports = router;