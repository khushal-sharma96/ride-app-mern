const mongoose = require('mongoose');
const schema = mongoose.Schema({
    captainId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    otp:{
        type:String,
        maxlength:6,
    },
    pickupLocation:{
        type:String,
        required:true,
        minlength:3
    },
    dropLocation:{
        type:String,
        required:true,
        minlength:3
    },
    fare:{
        type: Number,
        required:true
    },
    vehicleType:{
        type: String,
        required:true,
        enum: ["car", "bike", "auto"],
    },
    distance:{
        type:Number,
        required:true
    },
    status:{
        type: String,
        required:true,
        enum:['pending','accepted','cancelled','completed']
    }
},
{
    timestamps:true
}
); 
schema.index({userId:1});
schema.index({captainId:1});

module.exports = mongoose.model('ride',schema);