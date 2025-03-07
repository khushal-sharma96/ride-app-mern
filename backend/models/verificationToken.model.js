const mongoose = require('mongoose');
const schema = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    consumedAt:{
        type:Date,
        default:null
    }
},{
    timestamps:true
});

schema.statics.isEmailVerified = async function (userId){
    const isVerified  = await this.findOne({userId});
    return isVerified?(isVerified.consumedAt):true;
}

module.exports = mongoose.model('verificationToken',schema);