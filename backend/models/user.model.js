const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:3,
        },
        lastname:{
            type:String,
            minlength:3,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,    
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false,
    },
    socketId:{
        type:String,
    },
    userType:{
        type:Number,
        default:1
    },
    vehicleType:String,
    vehicleNumber:String
});

schema.methods.generateAuthToken = async function(){
    return jwt.sign({_id:this._id,name:this.fullname},process.env.JWT_STRING);
};
schema.methods.comparePassword = async function(password){
    console.log(password,this);
    return await bcrypt.compare(password,this.password); 
}
schema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model('user',schema);