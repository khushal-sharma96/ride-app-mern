const UserModel = require('../models/user.model.js');   
const {validationResult} = require('express-validator');
const UserService = require('../services/user.service.js');
const getAllUsers = async(req,res)=>{
    try{
        const users = await UserModel.find();
        return res.status(200).json(users);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports.registerUser = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors:errors.array()})
        let {fullname,email,password} = req.body;
        const {firstname,lastname} = fullname;
        password = await UserModel.hashPassword(password);
        const response = await UserService.createUser({firstname,lastname,email,password});
        return res.status(200).json(response);
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
        res.cookie('token',response.data.token);
        return res.status(response.status?200:404).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, error:err.getMessage});
    }
}

module.exports.getProfile = async(req,res)=>{
    try{
        const user = await UserModel.findById(req.user._id);
        return res.status(201).json({status:true, data:user});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, err:err.getMessage});
    }
}

module.exports.logoutUser = (req,res)=>{
    try{
        res.cookie("token","");
        return res.status(201).json({'status':true, message:"User logout successfully."});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status:false, err:err.getMessage});
    }
}