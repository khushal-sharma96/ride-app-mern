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
module.exports.createRide = async ({ userId, pickupLocation, dropLocation, fare, vehicleType }) => {
    if (!userId ||
        !pickupLocation ||
        !dropLocation ||
        !fare ||
        !vehicleType) {
        return { status: false, message: "All the fields are mandatory!" };
    }
    const existing = await RideModel.findOne({userId,status:{ $in: ['pending', 'accepted'] }});
    if(existing)
        return {status:false,message:'Already ride is in process!'};
    const crypto = require('crypto');
    const otp = crypto.randomInt(100000, 999999).toString();
    const ride = await RideModel.create({
        userId,
        otp,
        pickupLocation,
        dropLocation,
        fare,
        vehicleType,
        status: 'pending'
    });
    return { status: true, data: ride };
}