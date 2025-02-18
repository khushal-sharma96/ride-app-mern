const express = require('express');
const router = express.Router();
const {query}  = require('express-validator');
const MapController = require('../controllers/map.controller');
router.get('/suggestions',[
    query('value').notEmpty().isLength({min:3,max:15}).withMessage('Value should be minimun 3 to maximun 15 characters')
],MapController.getSuggestions);

module.exports = router