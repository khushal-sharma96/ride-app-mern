module.exports = () => {
    try {
        const mongoose = require('mongoose');
        const uri = process.env.DB_URL;
        if (process.env.APP_MODE == 'production') {
            // const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
            mongoose.connect(uri).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            });
            // mongoose.connect(uri, clientOptions);
        }
        else {
            console.log(process.env.DB_URL);
            mongoose.connect(uri).then(() => console.log("DB connected successfully.")).catch((err) => console.log(err));
        }
    }
    catch (err) {
        console.log(err);
    }
}