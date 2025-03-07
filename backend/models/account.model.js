const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    reason:String
},{
    timestamps:true
});
module.exports = mongoose.model('account',Schema);