const mongoose = require('mongoose');
const schema = mongoose.schema({
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
        minlength:6,
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
        required:true
    },
    vehicleType:{
        required:true,
        enum: ["car", "bike", "auto"],
    },
    status:{
        required:true,
        enum:['pending','accepted','cancelled','completed']
    }
}); 