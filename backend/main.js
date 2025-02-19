const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const httpServer =require('http').createServer(app);

const dbConnect = require('./db/db.connect.js');
const UserRoute = require('./routes/user.route.js');
const CaptainRoute = require('./routes/captain.route.js');
const MapRoute = require('./routes/map.route.js');
const CookieParser = require('cookie-parser');
dbConnect();
app.use(CookieParser());
app.use(cors());
app.get('/',(req,res)=>res.end('Hello World!'));
app.use('/user',UserRoute)
app.use('/captain',CaptainRoute);
app.use('/map',MapRoute);
module.exports = app;