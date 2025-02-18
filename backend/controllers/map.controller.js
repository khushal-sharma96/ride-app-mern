const {validationResult}  = require('express-validator');
const { getSuggestions } = require('../services/map.service');
module.exports.getSuggestions = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return {status:false,error:errors.array()}
        const suggestions =  await getSuggestions(req.query.value);
        return {status:true, data:suggestions};
    }
    catch(err){
        return {status:false, error:err.getMessage};
    }
}        