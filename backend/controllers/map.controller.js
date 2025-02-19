const { validationResult } = require('express-validator');
const { getSuggestions,calculateFare } = require('../services/map.service');
module.exports.getSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(403).json({ status: false, error: errors.array() })
        const suggestions = await getSuggestions(req.query.value);
        return res.status(201).json(suggestions);
    }
    catch (err) {
        return res.status(500).json({ status: false, error: err });
    }
}
module.exports.calculateFare = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(403).json({ status: false, error: errors.array() })
        const suggestions = await calculateFare({
            pickupLocation: req.body.pickupLocation,
            dropLocation: req.body.dropLocation,
        });
        return res.status(201).json(suggestions);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err });
    }
}        