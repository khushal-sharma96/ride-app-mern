const UserModel = require('../models/user.model');
const RideModel = require('../models/ride.model');
const AccountModel = require('../models/account.model');
// const mailQueue = require('../queue/mail.queue');
const sendEmail = require('../services/mail.service');
const verificationTokenModel = require('../models/verificationToken.model');
module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    try {
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
        UserModel.generateMailToken(user._id);
        return { status: true,user };
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.loginUser = async ({ email, password }) => {
    if (!email || !password)
        throw new Error('All fields are required!');

    const user = await UserModel.findOne({ email, status: { $in: ['active', null] } }).select('+password');
    if (!user)
        return { status: false, message: 'Invalid email or password!' };
    const checkPassword = await user.comparePassword(password);

    if (!checkPassword)
        return { status: false, message: 'Invalid email or password!' };
    
    isVerified = await verificationTokenModel.isEmailVerified(user._id);
    if(!isVerified)
        return {status:false, message:"Email is not verified!"}; 

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
    UserModel.generateMailToken(user._id,true);
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

module.exports.acceptRide = async (ride_id, captain_id) => {
    const ride = await RideModel.findById(ride_id);
    if (!ride)
        return { status: false, message: 'No ride found!' };
    if (ride.status != 'pending')
        return { status: false, message: 'ride already processed!' };
    ride.status = 'accepted';
    ride.captainId = captain_id;
    ride.save();
    return { status: true, data: ride };
}

module.exports.verifyOtp = async (ride_id, otp_value) => {
    const ride = await RideModel.findById(ride_id);
    if (ride && ride.otp == otp_value) {
        ride.status = 'started';
        ride.save();
        return { status: true, data: ride };
    }
    return { status: false, message: "Cant start the ride!" };
}

module.exports.updateProfile = async (user_id, profileData, image) => {
    if (!user_id)
        return { status: false, message: "User id is mandatory!" };
    const userData = await UserModel.findById(user_id);
    if (!userData)
        return { status: false, message: "User not found!" };
    console.log(profileData);
    if (profileData?.fullname)
        userData.fullname = JSON.parse(profileData.fullname)
    if (profileData?.vehicleNumber)
        userData.vehicleNumber = (profileData.vehicleNumber)
    if (profileData?.vehicleType)
        userData.vehicleType = (profileData.vehicleType)
    if (image)
        userData.image = 'uploads/' + image?.filename;
    userData.save();
    return { status: true, data: userData }
}
module.exports.updatePassword = async (user_id, { oldPassword, newPassword }) => {
    if (!user_id || !oldPassword || !newPassword)
        return { status: false, message: "All fields are mandatory!" };
    const userData = await UserModel.findById(user_id).select("+password");
    if (!userData)
        return { status: false, message: "User not found!" };
    const is_same = await userData.comparePassword(oldPassword)
    if (!is_same)
        return { statsu: false, message: "Invalid password!" };
    userData.password = await UserModel.hashPassword(newPassword);
    userData.save();
    return { status: true, message: "Password updated successfully" }
}

module.exports.deactivateAccount = async (user_id, reason) => {
    if (!user_id)
        return { status: false, message: "User id is mandatory!" };
    const userData = await UserModel.findById(user_id);
    if (!userData)
        return { status: false, message: "User not found!" };

    AccountModel.create({
        user_id,
        reason
    });
    userData.status = 'deactive';
    userData.save();
    return { status: true, message: "Account deactivated successfully" }
}
module.exports.getRideHistory = async (user) => {
    if (!user)
        return { status: false, message: "User id is mandatory!" };
    let rides = [];
    if (user.userType == '2')
        rides = await RideModel.find({ captainId: user._id }).populate('userId');
    else
        rides = await RideModel.find({ userId: user._id }).populate('captainId');
    return {
        status: true, data: rides.map((ride) => {
            userdata = user.userType == '2' ? ride?.userId : ride?.captainId;
            userdata = {
                email: userdata?.email,
                fullname: userdata?.fullname,
                image: userdata?.image,
            };
            delete (ride?._doc?.captainId);
            delete (ride?._doc?.userId);
            return {
                ...ride?._doc,
                userdata,
                createdAt: new Date(ride.createdAt).toLocaleString()
            }
        })
    }
}
module.exports.getRideDetails = async (rideId, userId) => {
    if (!userId || !rideId)
        return { status: false, message: "All fields are mandatory!" };
    const ride = await RideModel.findById(rideId)
        .populate('userId', 'fullname image email')
        .populate('captainId', 'fullname image email vehicleNumber');
    if (!ride)
        return { status: false, message: "Invalid ride id" };
    if (String(ride?.userId?._id) == String(userId) || String(ride?.captainId?._id) == String(userId))
        return { status: true, data: { ...ride?._doc, otp: String(ride?.userId?._id) == String(userId) ? ride?.otp : null } }
    return { status: false, message: "You are not authorised to this ride!" };
}

module.exports.getCurrentRide = async (userId) => {
    if (!userId)
        return { status: false, message: "User id is mandatory!" };
    const user = await UserModel.findById(userId);
    if (!user)
        return { status: false, message: "User not found!" };

    let condition = {
        status: { $in: ['accepted', 'pending', 'started'] },
    };
    if (user.userType == '2')
        condition.captainId = userId;
    else condition.userId = userId;

    const ride = await RideModel.findOne(condition);
    return { status: true, data: ride };
}
module.exports.completeRide = async (rideId, userId) => {
    if (!userId || !rideId)
        return { status: false, message: "All fields are mandatory!" };
    const user = await UserModel.findById(userId);
    if (!user)
        return { status: false, message: "User not found!" };

    const ride = await RideModel.findById(rideId);
    if (!ride) return { status: false, message: "Ride not found!" };

    if (String(ride?.captainId) != String(userId))
        return { status: false, message: "You are not authorised to this ride!" };

    if (ride.status != 'started')
        return { status: false, message: "Can't complete this ride, already processed!" };
    ride.status = 'completed'
    ride.save();
    return { status: true, data: ride };
}
module.exports.verifyEmail = async (token) => {
    if (!token)
        return { status: false, message: "Token is mandatory!" };
    const tokenRecord = await verificationTokenModel.findOne({
        token});
    if (!tokenRecord)
        return { status: false, message: "Invalid token!" };
    if(tokenRecord && tokenRecord?.consumedAt)
        return { status: false, message: "Token expired!" };
    
    await UserModel.verifyUser(tokenRecord);
    return { status: true, message: "Email is verified successfully." };
}