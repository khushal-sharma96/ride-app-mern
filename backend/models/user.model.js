const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const verificationTokenModel = require('./verificationToken.model');
const sendEmail = require('../services/mail.service');
const schema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 3,
        },
        lastname: {
            type: String,
            minlength: 3,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    socketId: {
        type: String,
    },
    userType: {
        type: Number,
        default: 1
    },
    vehicleType: String,
    vehicleNumber: String,
    image: {
        type: String,
    },
    status: {
        type: String,
        default: 'active'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
});
const consumeToken = async (token) => {
    try {
        return await verificationTokenModel.findOneAndUpdate({ token }, { consumedAt: Date.now() });
    }
    catch (err) {
        console.log(err);
    }
}
schema.methods.generateAuthToken = async function () {
    return jwt.sign({ _id: this._id, name: this.fullname }, process.env.JWT_STRING);
};
schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
schema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}
schema.statics.generateMailToken = async function(userId,isCaptain=false) {
    const token = crypto.randomBytes(16).toString('hex');
    await verificationTokenModel.create({
        userId,
        token,
    });
    const user = await this.findById(userId);
    await sendEmail({email:user?.email,text:"",subject:"Welcome",firstname:user?.fullname?.firstname,token});
}
schema.statics.verifyUser = async function ({ userId, token }) {
    await this.findByIdAndUpdate(userId, { isVerified: true });
    await consumeToken(token)
}

module.exports = mongoose.model('user', schema);