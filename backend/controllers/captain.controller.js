const UserModel = require('../models/user.model.js');   
const {validationResult} = require('express-validator');
const UserService = require('../services/user.service.js');

module.exports.registerUser = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors:errors.array()})
        let {fullname,email,password,vehicleType,vehicleNumber} = req.body;
        const {firstname,lastname} = fullname;
        password = await UserModel.hashPassword(password);
        const response = await UserService.createCaptain({firstname,lastname,email,password,vehicleType
            ,vehicleNumber});
        return res.status(response.status?200:422).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, error:err.getMessage});
    }
}

module.exports.loginUser = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(500).json({status:false, error: errors.array()});
        const {email,password} = req.body;
        const response = await UserService.loginUser({email,password});
        return res.status(response.status?200:404).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, error:err.getMessage});
    }
}
module.exports.completeRide = async(req,res)=>{
    try{
        const response = await UserService.completeRide(req.params.rideId,req?.user?._id);
        return res.status(response?.status?201:422).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, error:err.getMessage});
    }
}

module.exports.acceptRide = async(req,res)=>{
    try{
        const response = await UserService.acceptRide(req.params.ride_id,req.user._id);
        return res.status(response?.status?201:422).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, error:err.getMessage});
    }
}

module.exports.verifyOtp = async(req,res)=>{
    try{
        const response = await UserService.verifyOtp(req.body.ride_id,req.body.otp);
        return res.status(response?.status?201:422).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, error:err.getMessage});
    }
}

module.exports.getRideDetails = async(req,res)=>{
    try{
        const response = await UserService.getRideDetails(req.params.rideId,req?.user?._id);
        return res.status(response?.status?201:422).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, error:err.getMessage});
    }
}