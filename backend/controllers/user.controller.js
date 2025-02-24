const UserModel = require('../models/user.model.js');
const { validationResult } = require('express-validator');
const UserService = require('../services/user.service.js');
const RideModel = require('../models/ride.model.js');
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        let { fullname, email, password } = req.body;
        const { firstname, lastname } = fullname;
        password = await UserModel.hashPassword(password);
        const response = await UserService.createUser({ firstname, lastname, email, password });
        return res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.getMessage });
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        console.log("reqqq");
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(500).json({ status: false, error: errors.array() });
        const { email, password } = req.body;
        const response = await UserService.loginUser({ email, password });
        if(response.status)
        res.cookie('token', response.data.token);
        return res.status(response.status ? 200 : 404).json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.getMessage });
    }
}

module.exports.getProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        return res.status(201).json({ status: true, data: user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, err: err.getMessage });
    }
}

module.exports.logoutUser = (req, res) => {
    try {
        res.cookie("token", "");
        return res.status(201).json({ 'status': true, message: "User logout successfully." });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, err: err.getMessage });
    }
}

module.exports.createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        const response = await UserService.createRide({ ...req.body, userId: req.user._id,username:req.user?.fullname });
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, err: err.getMessage });
    }
}

module.exports.cancelRide = async (req, res) => {
    try {
        const ride = await RideModel.findById(req.params.ride_id);
        let message = "";
        if (ride) {
            if (['cancelled', 'completed'].indexOf(ride.status) < 0) {
               ride.status = 'cancelled';
               ride.save();
               return res.json({status:true, message:'Ride cancelled.'});
            }
            message = 'Ride already processed!';
        }
        else message = 'Ride not found!';
        return res.status(422).json({ status: false, message });
    }
    catch (err) {
        return res.status(500).json({ status: false, err: err.getMessage });
    }
}
module.exports.updateSocketId = async (req,res)=>{
    try{
        const data = await UserModel.findOneAndUpdate({_id:req.user._id},{socketId:req?.body?.id})
        return res.json({status:true,message:'Updated successfully.',data:req.param.id});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ status: false, err: err });
    }
}
module.exports.updateProfile = async (req,res)=>{
    try{
        const response = await UserService.updateProfile(req?.user?._id,req.body,req?.file);
        return res.status(response.status?201:500).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ status: false, err: err });
    }
}
module.exports.updatePassword = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(422).json({status:false, error:errors.array()});
        const response = await UserService.updatePassword(req?.user?._id,req.body);
        return res.status(response.status?201:500).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ status: false, err: err });
    }
}
module.exports.deactivateAccount = async (req,res)=>{
    try{
        const response = await UserService.deactivateAccount(req?.user?._id,req.body?.reason);
        return res.status(response.status?201:500).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ status: false, err: err });
    }
}
module.exports.getRideHistory = async (req,res)=>{
    try{
        const response = await UserService.getRideHistory(req?.user);
        return res.status(response.status?201:500).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ status: false, err: err });
    }
}