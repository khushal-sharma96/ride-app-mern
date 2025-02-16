const UserModel = require('../models/user.model');
module.exports.createUser = async({firstname,lastname,email,password})=>{
    if(!firstname|| !lastname || !email || !password)
        throw new Error('All fields are required!');

    const user = await UserModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    });
    return {status:true,user};
}

module.exports.loginUser = async({email,password})=>{
    if(!email || !password)
        throw new Error('All fields are required!');

    const user = await UserModel.findOne({email}).select('+password');
    if(!user)
        return {status:false, message:'Invalid email or password!'};
    const checkPassword = await user.comparePassword(password);
    
    if(!checkPassword)
        return {status:false, message:'Invalid email or password!'};

    const token = await user.generateAuthToken();
    return {status:true, data:{user:user, token}};
}
module.exports.createCaptain = async({firstname,lastname,email,password,vehicleType
    ,vehicleNumber})=>{
        if(!firstname ||!lastname||!email||!password||!vehicleType
            ||!vehicleNumber)
            return {status:false, message:'All fields are mandatory!'};
        const user = await UserModel.create({
            fullname:{
                firstname,lastname
            },
            userType:2,
            email,
            password,
            vehicleType,
            vehicleNumber
        });
        return {status:true, user,message:"Captain added successfully"};
    }