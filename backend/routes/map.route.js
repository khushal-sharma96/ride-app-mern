const express = require('express');
const router = express.Router();
const {query,body}  = require('express-validator');
const MapController = require('../controllers/map.controller');

router.get('/suggestions',[
    query('value').notEmpty().isLength({min:3}).withMessage('Value should be minimun 3 to maximun 15 characters')
],MapController.getSuggestions);

router.post('/fare',[
    body('pickupLocation.lat').notEmpty().withMessage('Pickup Location latitude is mandatory'),
    body('pickupLocation.lng').notEmpty().withMessage('Pickup Location Longitute is mandatory'),
    body('dropLocation.lat').notEmpty().withMessage('Drop Location latitude is mandatory'),
    body('dropLocation.lng').notEmpty().withMessage('Drop Location Longitute is mandatory')
],MapController.calculateFare);

module.exports = router