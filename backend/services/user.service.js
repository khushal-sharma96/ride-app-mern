const UserModel = require('../models/user.model');
const RideModel = require('../models/ride.model');
module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password)
        throw new Error('All fields are required!');

    const user = await UserModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    return { status: true, user };
}

module.exports.loginUser = async ({ email, password }) => {
    if (!email || !password)
        throw new Error('All fields are required!');

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user)
        return { status: false, message: 'Invalid email or password!' };
    const checkPassword = await user.comparePassword(password);

    if (!checkPassword)
        return { status: false, message: 'Invalid email or password!' };

    const token = await user.generateAuthToken();
    return { status: true, data: { user: user, token } };
}
module.exports.createCaptain = async ({ firstname, lastname, email, password, vehicleType
    , vehicleNumber }) => {
    if (!firstname || !lastname || !email || !password || !vehicleType
        || !vehicleNumber)
        return { status: false, message: 'All fields are mandatory!' };
    const user = await UserModel.create({
        fullname: {
            firstname, lastname
        },
        userType: 2,
        email,
        password,
        vehicleType,
        vehicleNumber
    });
    return { status: true, user, message: "Captain added successfully" };
}
module.exports.createRide = async ({ userId, pickupLocation, dropLocation, fare, distance, vehicleType, username }) => {
    if (!userId ||
        !pickupLocation ||
        !dropLocation ||
        !fare ||
        !vehicleType || !distance) {
        return { status: false, message: "All the fields are mandatory!" };
    }
    const existing = await RideModel.findOne({ userId, status: { $in: ['pending', 'accepted'] } });
    if (existing)
        return { status: false, message: 'Already ride is in process!' };
    const crypto = require('crypto');
    const otp = crypto.randomInt(100000, 999999).toString();
    const ride = await RideModel.create({
        userId,
        otp,
        pickupLocation,
        dropLocation,
        fare,
        vehicleType,
        distance,
        status: 'pending'
    });
    return { status: true, data: { ...ride?._doc, username: `${username?.firstname} ${username?.lastname}` } };
}

module.exports.acceptRide = async(ride_id,captain_id)=>{
    const ride = await RideModel.findById(ride_id);
    if(!ride)
        return {status:false, message:'No ride found!'};
    if(ride.status!='pending')
        return {status:false, message:'ride already processed!'};
    ride.status = 'accepted';
    ride.captain = captain_id;
    ride.save();
    return {status:true, data:ride};
}

module.exports.verifyOtp = async(ride_id,otp_value)=>{
    const ride = await RideModel.findById(ride_id);
    if(ride && ride.otp==otp_value){
        ride.status = 'started';
        ride.save();
        return {status:true,data:ride};
    }
    return {status:false, message:"Cant start the ride!"};
}

module.exports.updateProfile = async(user_id,profileData,image)=>{
    if(!user_id)
        return {status:false, message:"User id is mandatory!"};
    const userData = await UserModel.findById(user_id);
    if(!userData)
        return {status:false, message:"User not found!"};
    if(profileData?.fullname)
        userData.fullname = JSON.parse(profileData.fullname)
    if(image)
        userData.image = 'uploads/'+image?.filename;
    userData.save();
    return {status:true,data:userData}
}
module.exports.updatePassword = async(user_id,{oldPassword,newPassword})=>{
    if(!user_id || !oldPassword || !newPassword)
        return {status:false, message:"All fields are mandatory!"};
    const userData = await UserModel.findById(user_id).select("+password");
    if(!userData)
        return {status:false, message:"User not found!"};
    const is_same = await userData.comparePassword(oldPassword)
    if(!is_same)
        return {statsu:false,message:"Invalid password!"};
    userData.password = await UserModel.hashPassword(newPassword);
    userData.save();
    return {status:true,message:"Password updated successfully"}
}