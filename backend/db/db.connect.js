module.exports = ()=>{
    const mongoose = require('mongoose');
    console.log(process.env.DB_URL);
    mongoose.connect(process.env.DB_URL).then(()=>console.log("DB connected successfully.")).catch((err)=>console.log(err));
}