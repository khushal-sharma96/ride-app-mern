module.exports = async(req,res,next)=>{
    const token = req?.cookies?.token;// || req.headers.authorization.split(' ')[1];
    const jwt = require('jsonwebtoken');
    if(!token)
        return res.status(401).json({status:false, message:'Unauthorised access!'});
    try{
        const UserModel = require('../models/user.model');
        const decode = jwt.verify(token,process.env.JWT_STRING);
        const user = await UserModel.findById(decode._id);
        req.user = user;
        next();
    }
    catch(err){
        console.log(err)
        return res.end(500).json({status:false, error:err});
    }
}