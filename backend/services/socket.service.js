const rideModel = require('../models/ride.model');

module.exports = (httpServer) => {
    const io = require('socket.io')(httpServer);
    io.on('connection', (socket) => {

        console.log('user is connected', socket.id);

        socket.on('chat_message', (msg) => {
            console.log('Message: ' + msg);
            // io.to(socket.id).emit('receive_ride','hcfhvbh')
        });
        socket.on('SEARCH_CAPTAIN', async (data) => {
            const UserModel = require('../models/user.model');
            if (data?.otp)
                delete (data.otp);
            const ids = await UserModel.find({ userType: 2 }).select('socketId');
            const socketIds = ids.map(row => row.socketId);
            io.to(socketIds).emit("receive_ride", data);
        })
        socket.on('ACCEPT_RIDE',async(ride)=>{
            const  actualRide = await rideModel.findById(ride._id).populate('captainId','fullname image vehicleNumber').populate('userId','socketId');
            if(actualRide){
                socket.to(actualRide?.userId?.socketId).emit("RIDE_ACCEPTED",actualRide)
            }
        })
        socket.on("RIDE_STARTED",async(data)=>{
            const  actualRide = await rideModel.findById(ride._id).populate('userId');
            console.log(actualRide);
            if(actualRide){
                socket.to(actualRide.userId.socketId).emit("RIDE_STARTED",actualRide)
            }
        })

        socket.on('disconnect', () => {
            console.log('User  disconnected');
        });
    });
}